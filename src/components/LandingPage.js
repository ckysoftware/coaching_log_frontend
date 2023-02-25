import React, { useContext } from 'react'

import { makeStyles } from '@material-ui/core/styles';

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

}));

// use material ui pagination
const LandingPage = () => {
    const classes = useStyles();

    const { user } = useContext(UserContext);

    return (
        <div className={classes.header}>
            <h1> Welcome back, {user.first_name} {user.last_name}! </h1>
        </div>
    );
};

export default LandingPage;
