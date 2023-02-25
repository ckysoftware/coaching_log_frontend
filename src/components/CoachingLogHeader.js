import React from 'react'

import { makeStyles } from '@material-ui/core/styles';

import {padIntegerLeadingZeros} from '../util.js';

const useStyles = makeStyles((theme) => ({
    header: {
        textAlign: 'center',
        width: '100%',
        height: '100%',
    },
    mainText: {
        textAlign: 'left',
        marginLeft: theme.spacing(4),
    },
    text: {
        fontWeight: 'normal',
    },
}));

const CoachingLogHeader = ( props ) => {
    const classes = useStyles();

    const client_name = `${props.client_details.first_name} ${props.client_details.last_name}`;
    const client_id = padIntegerLeadingZeros(props.client_details.id);
    const coach_name = `${props.coach_details.first_name} ${props.coach_details.last_name}`;

    return (
        <div className={classes.header}>
            <h1> Coaching Log </h1>
            <div className={classes.mainText}>
                <h3>
                    Client Name:
                    <span className={classes.text}> {client_name} </span>
                </h3>
                <h3>
                    Client ID:
                    <span className={classes.text}> {client_id} </span>
                </h3>
                <h3>
                    Coach Name:
                    <span className={classes.text}> {coach_name} </span>
                </h3>
            </div>
        </div>
    )
}

export default CoachingLogHeader;
