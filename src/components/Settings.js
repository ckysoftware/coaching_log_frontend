import React, { useContext} from 'react';
import { makeStyles } from '@material-ui/core/styles';

import ChangePasswordButton from "./ChangePasswordButton";
import { UserContext } from '../contexts/UserContext';

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
    page: {
      marginTop: theme.spacing(4),
      marginLeft: theme.spacing(4),
      marginRight: theme.spacing(4),
      marginBottom: theme.spacing(4),
    },
}));

const Settings = () => {
    const classes = useStyles();
    const { user } = useContext(UserContext);

    return (
      <div>
        <div className={classes.header}>
          <h1> Settings </h1>
        </div>
        <div className={classes.page}>
          <p> Your name: {user.first_name} {user.last_name} </p>
          <ChangePasswordButton/>
        </div>
      </div>
    );
};

export default Settings;
