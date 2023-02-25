import React,  { useContext } from 'react';
import axios from 'axios';
import { useHistory } from "react-router-dom";

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';

import { UserContext } from '../contexts/UserContext';

const useStyles = makeStyles((theme) => ({
  box: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
  },
  button: {
      marginTop: theme.spacing(4),
      marginBottom: theme.spacing(4),
      textAlign: 'center',
  },
}));

export default function SignOutButton() {
    const classes = useStyles();

    const history = useHistory();
    const { setUser } = useContext(UserContext);
    const api_url = process.env.REACT_APP_API_URL;

    const handleSignOutClick = async () => {
      await axios.post(`${api_url}auth/logout`)
      .then( response => {
          setUser(null);
          history.push("/signin");
        }
      )
    }
    return (
      <Box className={classes.box}>
          <Button
              className={classes.button}
              variant='outlined'
              color='default'
              size='small'
              onClick={handleSignOutClick}
          >
          Sign out
          </Button>
     </Box>
   )
}
