import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { makeStyles } from '@material-ui/core/styles';

import { Link, useHistory } from "react-router-dom";

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import PersonIcon from '@material-ui/icons/Person';

import {padIntegerLeadingZeros} from '../util.js';

const useStyles = makeStyles((theme) => ({
    header: {
        textAlign: 'center',
        width: '100%',
    },
    mainText: {
        textAlign: 'left',
        marginLeft: '50px',
    },
    text: {
        fontWeight: 'normal',
    },
    page: {
      marginTop: theme.spacing(6),
    },
    link: {
      cursor: "pointer",
      color: "blue",
      textDecoration: "underline",
    },
}));



const CoachingLogHomePage = () => {
    const classes = useStyles();
    const api_url = process.env.REACT_APP_API_URL;

    const history = useHistory();
    const baseurl = history.location.pathname.replace("/home","")

    const [clients, setClients] = useState([]);

    useEffect(() => {
      async function getClientList() {
        console.log(`${api_url}clients/list`);
        await axios.get(`${api_url}clients/list`)
          .then(res => {
            setClients(res.data)
          }).catch(err => {
            console.log(err);
        });
      }
       getClientList();
    }, []);

    const RenderClientList = (element) => {
      const first_name = element.first_name;
      const last_name = element.last_name;
      const client_id = padIntegerLeadingZeros(element.id);

      return (
          <ListItem className={classes.link} key={client_id} component={Link} to={`${baseurl}/client/${client_id}`}>
            <ListItemIcon>
              <PersonIcon/>
            </ListItemIcon>
            <ListItemText primary={`Client: ${first_name} ${last_name} (${client_id})`}/>
          </ListItem>
      )
    };

    return (
        <div className={classes.header}>
            <h1> Coaching Log </h1>
            <List>
              {clients.map(RenderClientList)}
            </List>
        </div>
    );
};

export default CoachingLogHomePage;
