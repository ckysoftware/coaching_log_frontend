import React, { useContext }from 'react';

import { makeStyles } from '@material-ui/core/styles';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import SettingsIcon from '@material-ui/icons/Settings';
import SignOutButton from "./SignOutButton";
import { Link } from "react-router-dom";

import { UserContext } from '../contexts/UserContext';
import SidebarAdmin from "./SidebarAdmin";

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
  box: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
  },
  button: {
      marginTop: theme.spacing(4),
      marginBottom: theme.spacing(8),
      textAlign: 'center',
  },
}));


const Sidebar = () => {
    const { user } = useContext(UserContext);
    const classes = useStyles();

    return (
          <div className={classes.root}>
              <List component="nav">
                  <ListItem button component={Link} to="/coaching-log/home" >
                      <ListItemIcon>
                          <PeopleAltIcon />
                      </ListItemIcon>
                      <ListItemText primary="Coaching Log" />
                  </ListItem>
              </List>
              <Divider/>
              {user.role === "admin" ?
                <div>
                    <SidebarAdmin/>
                    <Divider/> 
                </div>
                : null }
              <List component="nav">
                  <ListItem button component={Link} to="/settings">
                      <ListItemIcon>
                          <SettingsIcon/>
                      </ListItemIcon>
                      <ListItemText primary="Settings" />
                  </ListItem>
              </List>
              <SignOutButton/>
          </div>
  );
}

export default Sidebar;
