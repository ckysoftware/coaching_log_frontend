import React, { useState, useEffect } from 'react';

import axios from 'axios';

import { makeStyles } from '@material-ui/core/styles';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Table from '@material-ui/core/Table';
import TableHead from'@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import LoadingPage from "./LoadingPage";

import {padIntegerLeadingZeros} from '../util.js';

const useStyles = makeStyles((theme) => ({
    header: {
        textAlign: 'center',
        width: '100%',
        height: '100%',
    },
    mainText: {
        textAlign: 'left',
        marginLeft: '30px',
    },
    text: {
        fontWeight: 'normal',
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
    boldText: {
        fontWeight: 'bold',
    },
    table: {
      marginLeft: 'auto',
      marginRight: 'auto',
      justifyContent: "center",
      width: "60%",
      minWidth: 1000,
    },
}));


const renderClientsList = (clientsList) => {
  return (
      <List dense>
        {clientsList.map((client) => {
          return (
            <ListItem key={client.id} style={{align: "left"}}>
              {`${client.first_name} ${client.last_name} (${padIntegerLeadingZeros(client.id)})`}
            </ListItem>
          )})}
      </List>
    )
}

const UsersListPage = () => {
    const classes = useStyles();
    const api_url = process.env.REACT_APP_API_URL;

    const [page, setPage] = useState(-1);
    const [rowsPerPage, setRowsPerPage] = useState(30);

    const [usersList, setUsersList] = useState([]);
    const [emptyRows, setEmptyRows] = useState(0);

    const [fetched, setFetched] = useState(false);

    const handleChangePage = (_event, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    };

    useEffect(() => {
      function changeEmptyRows() {
        setEmptyRows(rowsPerPage - Math.min(rowsPerPage, usersList.length - page * rowsPerPage));
      };
      changeEmptyRows();
    }, [page, rowsPerPage])

    useEffect(() => {
      async function fetchUsersList() {
        await axios.get(`${api_url}users/list-all` //, { params: {limit: rowsPerPage, skip: startIndex}}}
        ).then(res => {
          setUsersList(res.data);
          setPage(0);
          setFetched(true);
        })
      }
      fetchUsersList();
    }, []);

    return (fetched ? 
      <div>
        <div className={classes.header}>
            <h1> Users List </h1>
        </div>
        <TableContainer component={Paper} className={classes.table}>
          <Table size="small" aria-label="custom pagination table">
            <TableHead>
              <TableRow>
                <TableCell>Username</TableCell>
                <TableCell align="left">Name</TableCell>
                <TableCell align="left">Email</TableCell>
                <TableCell align="left">Role</TableCell>
                <TableCell align="left">Clients</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(rowsPerPage > 0
                ? usersList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                : usersList // show all
              ).map((row) => (
                <TableRow key={row.id}>
                  <TableCell component="th" scope="row" style={{ width: "10%"}}>
                    {row.username}
                  </TableCell>
                  <TableCell style={{ width: "25%" }} align="left">
                    {`${row.first_name} ${row.last_name}`}
                  </TableCell>
                  <TableCell style={{ width: "20%" }} align="left">
                    {row.email}
                  </TableCell>
                  <TableCell style={{ width: "5%" }} align="left">
                    {row.role}
                  </TableCell>
                  <TableCell style={{ width: "40%" }} align="left">
                    {renderClientsList(row.clients_list)}
                  </TableCell>
                </TableRow>
              ))}

              {(emptyRows > 0 && page!==0) ? (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              ) : null}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[15, 30, 45, { label: 'All', value: -1 }]}
                  count={usersList.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  SelectProps={{
                    inputProps: { 'aria-label': 'rows per page' },
                    native: true,
                  }}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      </div>
    : <LoadingPage />
    );
};

export default UsersListPage;
