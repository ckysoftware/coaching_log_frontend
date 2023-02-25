import React from 'react'

import { makeStyles } from '@material-ui/core/styles';


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
const Placeholder = () => {
    const classes = useStyles();

    return (
        <div className={classes.header}>
            <h1> This is a Placeholder </h1>
        </div>
    );
};

export default Placeholder;
