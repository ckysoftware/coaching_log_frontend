import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import PersonAddOutlinedIcon from '@material-ui/icons/PersonAddOutlined';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import RecentActorsIcon from '@material-ui/icons/RecentActors';
import RecentActorsOutlinedIcon from '@material-ui/icons/RecentActorsOutlined';
import { Link } from "react-router-dom";


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


const SidebarAdmin = () => {
    const classes = useStyles();

    return (
          <div className={classes.root}>
              <List component="nav">
                  <ListItem button component={Link} to="/admin/create-user" >
                      <ListItemIcon>
                          <PersonAddIcon/>
                      </ListItemIcon>
                      <ListItemText primary="Create User" />
                  </ListItem>
                  <ListItem button component={Link} to="/admin/create-client">
                      <ListItemIcon>
                          <PersonAddOutlinedIcon/>
                      </ListItemIcon>
                      <ListItemText primary="Create Client" />
                  </ListItem>
                  <ListItem button component={Link} to="/admin/assign-coach">
                      <ListItemIcon>
                          <AssignmentIndIcon/>
                      </ListItemIcon>
                      <ListItemText primary="Assign Coach" />
                  </ListItem>
                  <ListItem button component={Link} to="/admin/list-users">
                      <ListItemIcon>
                          <RecentActorsIcon/>
                      </ListItemIcon>
                      <ListItemText primary="List Users" />
                  </ListItem>
                  <ListItem button component={Link} to="/admin/list-clients">
                      <ListItemIcon>
                          <RecentActorsOutlinedIcon/>
                      </ListItemIcon>
                      <ListItemText primary="List Clients" />
                  </ListItem>
                </List>
          </div>
  );
}

export default SidebarAdmin;
