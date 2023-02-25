import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';

import qs from 'qs';
import axios from 'axios';

import { makeStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

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
}));

const AssignCoachPage = () => {
    const classes = useStyles();
    const api_url = process.env.REACT_APP_API_URL;

    const { handleSubmit, control, setError, trigger} = useForm();

    const [openAckDialog, setOpenAckDialog] = useState(false);
    const handleCloseAckDialog = () => {
        setOpenAckDialog(false);
        window.location.reload();
    };

    const [openErrDialog, setOpenErrDialog] = useState(false);
    const handleCloseErrDialog = () => {
      setOpenErrDialog(false);
    }
    const [errorMsg, setErrorMsg] = useState("");

    const [coachUsername, setCoachUsername] = useState("");
    const [coachName, setCoachName] = useState("");
    const [clientID, setClientID] = useState("");
    const [clientName, setClientName] = useState("");

    const onSubmit = async (data) => {
      console.log(data);
      const { coach_username, client_id } = data
      const payload = qs.stringify({coach_username, client_id});
      const header = {'Content-Type': 'application/x-www-form-urlencoded'}
      console.log(payload)
      await axios.post(`${api_url}clients/assign-coach`, payload, {headers: header}
      ).then(async (response) => {
        setCoachUsername(coach_username);
        setCoachName(`${response.data.coach_details.first_name} ${response.data.coach_details.last_name}`);
        setClientID(padIntegerLeadingZeros(response.data.client_details.id));
        setClientName(`${response.data.client_details.first_name} ${response.data.client_details.last_name}`);
        setOpenAckDialog(true);
      }).catch( err => {
        console.log(err)
        const res = err.response;
        if (res.data.detail === "Username not found") {
          setError("coach_username", {
            type: "manual",
            message: "Coach username not found",
          })
        }
        else if (res.data.detail === "Client ID not found") {
          setError("client_id", {
            type: "manual",
            message: "Client ID not found",
          })
        }
        else {
          setErrorMsg(`Error ${res.status}-${res.statusText}: ${res.data.detail}`)
          setOpenErrDialog(true);
        }
      });
    };

    return (
      <div>
        <div className={classes.header}>
            <h1> Assign Client to Coach </h1>
        </div>

        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div>
            <form className={classes.form} onSubmit={handleSubmit(onSubmit)} noValidate>
              <Controller
                name="coach_username"
                control={control}
                defaultValue=""
                rules={{ required: 'Coach username is required'}}
                render={({ field: { onChange, value }, fieldState: { error }, ...props }) => (
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="coach_username"
                    label="Coach username"
                    name="coach_username"
                    autoFocus
                    value={value}
                    onChange={(event) => {
                      if (props.formState.isSubmitted) {trigger()}
                      onChange(event.target.value);
                    }}
                    error={!!error}
                    helperText={error ? error.message : null}
                  />
                )}
              />
              <Controller
                name="client_id"
                control={control}
                defaultValue=""
                rules={{ required: 'Client ID is required'}}
                render={({ field: { onChange, value }, fieldState: { error }, ...props }) => (
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="client_id"
                    label="Client ID"
                    id="client_id"
                    value={value}
                    onChange={(event) => {
                      if (props.formState.isSubmitted) {trigger()}
                      onChange(event.target.value);
                    }}
                    error={!!error}
                    helperText={error ? error.message : null}
                  />
                )}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Assign coach to client
              </Button>
            </form>
          </div>
          <Dialog
              open={openAckDialog}
              onClose={handleCloseAckDialog}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
          >
              <DialogTitle id="alert-dialog-title">{"Acknowledgement"}</DialogTitle>
              <DialogContent>
                  <DialogContentText>
                    Successfully assigned {coachName} ({coachUsername}) to {clientName} ({clientID}).
                  </DialogContentText>
              </DialogContent>
              <DialogActions>
                  <Button onClick={handleCloseAckDialog} color="primary" autoFocus>
                      OK
                  </Button>
              </DialogActions>
          </Dialog>
          <Dialog
              open={openErrDialog}
              onClose={handleCloseErrDialog}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
          >
              <DialogTitle id="alert-dialog-title">{"Error"}</DialogTitle>
              <DialogContent>
                  <DialogContentText>
                    {errorMsg}
                  </DialogContentText>
              </DialogContent>
              <DialogActions>
                  <Button onClick={handleCloseErrDialog} color="primary" autoFocus>
                      OK
                  </Button>
              </DialogActions>
          </Dialog>
        </Container>
      </div>
    );
};

export default AssignCoachPage;
