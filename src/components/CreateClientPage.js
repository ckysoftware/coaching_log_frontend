import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';

import qs from 'qs';
import axios from 'axios';

import { makeStyles } from '@material-ui/core/styles';


import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import MenuItem from '@material-ui/core/MenuItem';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import {padIntegerLeadingZeros} from '../util.js';

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
    table: {
      minWidth: 650,
    },
    absoluteScroll: {
      overflowY: 'auto',
      overflowX: 'auto',
      overflow: 'auto',
      position: 'absolute',
    }
}));

const sex = [
  {
    value: 'M',
    label: 'Male',
  },
  {
    value: 'F',
    label: 'Female',
  },
];

const generate_dq_array = (dq_question, dq_answer) => {
  var dq_question_arr = dq_question.split("\t");
  var dq_answer_arr = dq_answer.split("\t");
  // pop trailing empty elements
  while (dq_question_arr[dq_question_arr.length-1] === "") {
    dq_question_arr.pop();
  };
  dq_answer_arr = dq_answer_arr.slice(0, dq_question_arr.length);
  const dq_arr = [dq_question_arr, dq_answer_arr ]
  return dq_arr
};

const CreateClientPage = () => {
    const classes = useStyles();
    const api_url = process.env.REACT_APP_API_URL;

    const {handleSubmit, control, trigger} = useForm();

    const [openDQDialog, setOpenDQDialog] = useState(false);
    const handleCloseDQDialog = () => {
      setOpenDQDialog(false);
    };
    const handleConfirmDQDialog = () => {
      setOpenDQDialog(false);
      submitForm();
    }

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

    const [newClientID, setNewClientID] = useState("");
    const [newClientName, setNewClientName] = useState("");

    const [dq_arr, setDQ_arr] = useState([[]]);

    const [payload, setPayload] = useState("");

    const onSubmit = (data) => {
      const {first_name, last_name, email, mobile_phone, sex, age, current_location, dq_question, dq_answer} = data;
      setDQ_arr(generate_dq_array(dq_question, dq_answer));

      // payload without dq
      setPayload(qs.stringify({first_name, last_name, email, mobile_phone, sex, age, current_location}));

      setNewClientName(`${first_name} ${last_name}`);
      setOpenDQDialog(true);
    };

    const submitForm = async () => {
      const header = {'Content-Type': 'application/x-www-form-urlencoded'};

      while (dq_arr === [[]]) {
        await setTimeout(500);
      }
      const dq = "&dq=" + encodeURIComponent(JSON.stringify(dq_arr));

      console.log(payload+dq);
      await axios.post(`${api_url}clients/create`, payload+dq, {headers: header}
      ).then(async (response) => {
        setNewClientID(padIntegerLeadingZeros(response.data.client_id));
        setOpenAckDialog(true);
      }).catch( err => {
        setErrorMsg(`Error ${err.response.status}-${err.response.statusText}: ${err.response.data.detail}`)
        setOpenErrDialog(true);
      });
    };

    return (
      <div>
        <div className={classes.header}>
            <h1> Create Client </h1>
        </div>

        <Container component="main" maxWidth="sm">
          <CssBaseline />
          <div>
            <form className={classes.form} onSubmit={handleSubmit(onSubmit)} noValidate>
              <Controller
                name="first_name"
                control={control}
                defaultValue=""
                rules={{ required: 'First name is required', maxLength: {value: 80, message: 'Exceed max length'}}}
                render={({ field: { onChange, value }, fieldState: { error }, ...props }) => (
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="first_name"
                    label="First name"
                    id="first_name"
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
                name="last_name"
                control={control}
                defaultValue=""
                rules={{ required: 'Last name is required', maxLength: {value: 80, message: 'Exceed max length'}}}
                render={({ field: { onChange, value }, fieldState: { error }, ...props }) => (
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="last_name"
                    label="Last name"
                    id="last_name"
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
                name="email"
                control={control}
                defaultValue=""
                rules={{ required: 'Email is required', pattern: { value: /^\S+@\S+$/, message: "Invalid email"}}}
                render={({ field: { onChange, value }, fieldState: { error }, ...props }) => (
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="email"
                    label="Email"
                    id="email"
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
                name="mobile_phone"
                control={control}
                defaultValue=""
                rules={{  required: 'Mobile phone is required',
                          pattern: { value: /^\+\S+[- ].*/, message: "Format must be in +CountryCode XXXX, e.g. +852 92345678, +44 7911 123456"}}}
                render={({ field: { onChange, value }, fieldState: { error }, ...props }) => (
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="mobile_phone"
                    label="Mobile phone number with country code"
                    placeholder="e.g. +852 92345678, +44 7911 123456"
                    id="mobile_phone"
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
                name="sex"
                control={control}
                defaultValue=""
                rules={{ required: 'Sex is required' }}
                render={({ field: { onChange, value }, fieldState: { error }, ...props }) => (
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    select
                    id="sex"
                    label="Sex"
                    value={value}
                    onChange={ (event) => {
                      onChange(event.target.value);
                    }}
                    error={!!error}
                    helperText={error ? error.message : null}
                  >
                    {sex.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                )}
              />
              <Controller
                name="age"
                control={control}
                defaultValue=""
                rules={{  required: 'Age is required',
                          maxLength: {value: 3, message: 'Exceed max length'},
                          pattern: { value: /^[1-9][0-9]*$/, message: "Only integer is allowed"}}}
                render={({ field: { onChange, value }, fieldState: { error }, ...props }) => (
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="age"
                    label="Age"
                    id="age"
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
                name="current_location"
                control={control}
                defaultValue=""
                rules={{ required: 'Current location is required', maxLength: {value: 80, message: 'Exceed max length'}}}
                render={({ field: { onChange, value }, fieldState: { error }, ...props }) => (
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="current_location"
                    label="Current location"
                    id="current_location"
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
                name="dq_question"
                control={control}
                defaultValue=""
                rules={{ required: 'Discovery questionnaire question is required'}}
                render={({ field: { onChange, value }, fieldState: { error }, ...props }) => (
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="dq_question"
                    label="Discovery questionnaire question"
                    id="dq_question"
                    value={value}
                    onChange={(event) => {
                      if (props.formState.isSubmitted) {trigger()}
                      onChange(event.target.value);
                    }}
                    error={!!error}
                    helperText={error ? error.message : "Please copy the whole row in gsheet by clicking on the row number"}
                  />
                )}
              />
              <Controller
                name="dq_answer"
                control={control}
                defaultValue=""
                rules={{ required: 'Discovery questionnaire answer is required'}}
                render={({ field: { onChange, value }, fieldState: { error }, ...props }) => (
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="dq_answer"
                    label="Discovery questionnaire answer"
                    id="dq_answer"
                    value={value}
                    onChange={(event) => {
                      if (props.formState.isSubmitted) {trigger()}
                      onChange(event.target.value);
                    }}
                    error={!!error}
                    helperText={error ? error.message : "Please copy the whole row in gsheet by clicking on the row number"}
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
                Create new client
              </Button>
            </form>
          </div>
          <Dialog
              open={openDQDialog}
              onClose={handleCloseDQDialog}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
              maxWidth="md"
          >
              <DialogTitle id="alert-dialog-title">{"Discovery Questionnaire import"}</DialogTitle>
              <DialogContent>
                  <DialogContentText>
                    Please confirm the Discovery Questionnaire is imported correctly.
                  </DialogContentText>
                  <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="simple table">
                      <TableBody>
                        {[...Array(dq_arr[0].length).keys()].map((index) => (
                          <TableRow key={index}>
                            <TableCell component="th" scope="row">{dq_arr[0][index]}</TableCell>
                            <TableCell>{dq_arr[1][index]}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
              </DialogContent>
              <DialogActions>
                  <Button onClick={handleCloseDQDialog} color="primary">
                      Cancel
                  </Button>
                  <Button onClick={handleConfirmDQDialog} color="primary" autoFocus>
                      Confirm
                  </Button>
              </DialogActions>
          </Dialog>
          <Dialog
              open={openAckDialog}
              onClose={handleCloseAckDialog}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
          >
              <DialogTitle id="alert-dialog-title">{"Acknowledgement"}</DialogTitle>
              <DialogContent>
                  <DialogContentText>
                    Successfully created a new client. Please record this client ID assigned to this client.
                  </DialogContentText>
                  <DialogContentText className={classes.boldText}>
                    Client ID: {newClientID}
                  </DialogContentText>
                  <DialogContentText className={classes.boldText}>
                    Client name: {newClientName}
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

export default CreateClientPage;
