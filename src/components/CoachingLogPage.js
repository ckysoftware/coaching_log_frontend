import React from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

import { useState, useEffect } from 'react'
import SplitPane from "react-split-pane";
import CoachingLogHeader from "./CoachingLogHeader";
import CoachingLogFormNew from "./CoachingLogFormNew";
import CoachingLogFormView from "./CoachingLogFormView";
import LoadingPage from "./LoadingPage";

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import { makeStyles } from '@material-ui/core/styles';


const absoluteStyle={
  overflowY: 'auto',
  overflowX: 'auto',
  overflow: 'auto',
  position: 'absolute',
};

const relativeStyle={
  overflowY: 'auto',
  overflowX: 'auto',
  overflow: 'auto',
  position: 'relative',
};

const useStyles = makeStyles((theme) => ({
    header: {
        textAlign: 'center',
        width: '100%',
        height: '100%',
        marginBottom: '60px',
    },
    log: {
        textAlign: 'left',
        marginTop: theme.spacing(8),
    },
}));


const CoachingLogPage = (props) => {
    // current coaching log version = 1.1
    const classes = useStyles();
    const api_url = process.env.REACT_APP_API_URL;

    const history = useHistory();
    // previous answer from the server
    const client_id = props.match.params.id;
    const generateEmptyCoachingLog = () => {
      const emptyCoachingLog = [{
        version: "",
        data: {
          ansDate: new Date(),
          ansSessionFormat: "Online",
          ansMeetingVenue: "",
          ansSessionDuration: "",
          ansQ1Introduction: "",
          ansQ2Dermatology: "",
          ansQ3Pharmacology: "",
          ansQ4Nutrition: "",
          ansQ5Stress: "",
          ansQ6Sleep: "",
          ansQ7Exercise: "",
          ansQ8Environment: "",
          ansQ9Others: "",
        },
        locked: true,
        created_by: "",
        created_at: new Date(),
        edited_by: "",
        edited_at: new Date(),
      }]
      return emptyCoachingLog;
    }

    const [openErrorDialog, setOpenErrorDialog] = useState(false)

    const handleCloseErrorDialog = () => {
        setOpenErrorDialog(false);
        history.push("/coaching-log/home");
    };
    const [coachingLogs, setCoachingLogs] = useState(generateEmptyCoachingLog());
    const [numOfEntries, setNumOfEntries] = useState(1);
    const [fetchedLog, setFetchedLog] = useState(false);

    const [clientDetails, setClientDetails] = useState({});
    const [fetchedClientDetails, setFetchedClientDetails] = useState(false);

    const [errorMsg, setErrorMsg] = useState("");



    useEffect( () => {
        const fetchCoachingLogs = async () => {
            await axios.get(`${api_url}coaching-log/list/${client_id}`)
              .then(res => {
                if (res.data.length !== 0) { // has existing coaching log
                  setNumOfEntries(res.data.length);
                  setCoachingLogs(res.data);
                }
                setFetchedLog(true);
              }).catch(err => {
                const res = err.response;
                console.log(res);
                setErrorMsg(`Error ${res.status}-${res.statusText}: ${res.data.detail}`)
                setOpenErrorDialog(true);
              })
        };
        fetchCoachingLogs();
    }, []);

    useEffect( () => {
      const fetchClientDetails = async () => {
        await axios.get(`${api_url}clients/details/${client_id}`)
          .then(res => {
            setClientDetails(res.data);
            setFetchedClientDetails(true);
          }).catch(err => {
            const res = err.response;
            console.log(res)
            setErrorMsg(`Error ${res.status}-${res.statusText}: ${res.data.detail}`)
            setOpenErrorDialog(true);
          })
      };
      fetchClientDetails();
    }, []);

    
    return (
      <div>
        <SplitPane split="horizontal" defaultSize={150} style={absoluteStyle} allowResize={false}>
            {fetchedClientDetails ? <CoachingLogHeader {...clientDetails}/> : <LoadingPage/>}
            <SplitPane split="vertical" defaultSize="50%" style={relativeStyle} allowResize={false} className={classes.log}>
                {fetchedLog ? <CoachingLogFormView coachingLogs={coachingLogs} numOfEntries={numOfEntries} client_id={client_id}/> : <LoadingPage/>}
                <CoachingLogFormNew client_id={client_id}/>
            </SplitPane>
        </SplitPane>
        <Dialog
            open={openErrorDialog}
            onClose={handleCloseErrorDialog}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">{"403 Forbidden"}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                {errorMsg}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCloseErrorDialog} color="primary">
                    OK
                </Button>
            </DialogActions>
        </Dialog>
      </div>
    );
};

export default CoachingLogPage;
