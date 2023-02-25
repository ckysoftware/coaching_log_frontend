import React, { useState, useEffect } from 'react';

import axios from 'axios';
import { Link, useHistory } from "react-router-dom";

import { makeStyles } from '@material-ui/core/styles';

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
import {padIntegerLeadingZeros} from '../util.js'

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
    link: {
      cursor: "pointer",
      color: "blue",
      textDecoration: "underline",
    },
    table: {
      marginLeft: 'auto',
      marginRight: 'auto',
      justifyContent: "center",
      width: "60%",
      minWidth: 1000,
    },
}));


const ClientsListPage = () => {
    const classes = useStyles();
    const api_url = process.env.REACT_APP_API_URL;

    const history = useHistory();
    const baseurl = history.location.pathname.replace("/admin/list-clients","")

    const [page, setPage] = useState(-1);
    const [rowsPerPage, setRowsPerPage] = useState(30);

    const [clientsList, setClientsList] = useState([]);
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
        setEmptyRows(rowsPerPage - Math.min(rowsPerPage, clientsList.length - page * rowsPerPage));
      };
      changeEmptyRows();
    }, [page, rowsPerPage])

    useEffect(() => {
      async function fetchClientsList() {
        await axios.get(`${api_url}clients/list-all` //, { params: {limit: rowsPerPage, skip: startIndex}}}
        ).then(res => {
          setClientsList(res.data);
          setPage(0);
          setFetched(true);
        })
      }
      fetchClientsList();
    }, []);

    return (fetched ? 
      <div>
        <div className={classes.header}>
            <h1> Clients List </h1>
        </div>

        <TableContainer component={Paper} className={classes.table}>
          <Table size="small" aria-label="custom pagination table">
            <TableHead>
              <TableRow>
                <TableCell>Client ID</TableCell>
                <TableCell align="left">Name</TableCell>
                <TableCell align="left">Coach username</TableCell>
                <TableCell align="left">Phone</TableCell>
                <TableCell align="left">Email</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(rowsPerPage > 0
                ? clientsList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                : clientsList // show all
              ).map((row) => (
                <TableRow key={row.id}>
                  <TableCell className={classes.link} scope="row" style={{ width: "5%"}}
                    onClick={() => history.push(`${baseurl}/coaching-log/client/${padIntegerLeadingZeros(row.id)}`)}>
                    {padIntegerLeadingZeros(row.id)}
                  </TableCell>
                  <TableCell style={{ width: "30%" }} align="left">
                    {`${row.first_name} ${row.last_name}`}
                  </TableCell>
                  <TableCell style={{ width: "20%" }} align="left">
                    {row.coach_username}
                  </TableCell>
                  <TableCell style={{ width: "20%" }} align="left">
                    {row.mobile_phone}
                  </TableCell>
                  <TableCell style={{ width: "25%" }} align="left">
                    {row.email}
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
                  rowsPerPageOptions={[15, 30, 45,{ label: 'All', value: -1 }]}
                  count={clientsList.length}
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

export default ClientsListPage;
