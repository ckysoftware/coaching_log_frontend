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

const roles = [
  {
    value: 'admin',
    label: 'Admin',
  },
  {
    value: 'coach',
    label: 'Health coach',
  },
];



// use material ui pagination
const CreateUserPage = () => {
    const classes = useStyles();
    const api_url = process.env.REACT_APP_API_URL;

    const { handleSubmit, control, trigger} = useForm();

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

    const [newPassword, setNewPassword] = useState("");
    const [newUsername, setNewUsername] = useState("");

    const onSubmit = async (data) => {
      console.log(data);
      const { username, email, first_name, last_name, role} = data
      const payload = qs.stringify({username, email, first_name, last_name, role});
      const header = {'Content-Type': 'application/x-www-form-urlencoded'}
      console.log(payload)
      await axios.post(`${api_url}users/create`, payload, {headers: header}
      ).then(async (response) => {
        setNewUsername(username);
        setNewPassword(response.data.password);
        setOpenAckDialog(true);
      }).catch( err => {
        setErrorMsg(`Error ${err.response.status}-${err.response.statusText}: ${err.response.data.detail}`)
        setOpenErrDialog(true);
      });
    };

    return (
      <div>
        <div className={classes.header}>
            <h1> Create User </h1>
        </div>

        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div>
            <form className={classes.form} onSubmit={handleSubmit(onSubmit)} noValidate>
              <Controller
                name="username"
                control={control}
                defaultValue=""
                rules={{ required: 'Username is required'}}
                render={({ field: { onChange, value }, fieldState: { error }, ...props }) => (
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="username"
                    label="Username"
                    name="username"
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
                name="role"
                control={control}
                defaultValue=""
                rules={{ required: 'Role is required' }}
                render={({ field: { onChange, value }, fieldState: { error }, ...props }) => (
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    select
                    id="role"
                    label="Role"
                    value={value}
                    onChange={ (event) => {
                      onChange(event.target.value);
                    }}
                    error={!!error}
                    helperText={error ? error.message : null}
                  >
                    {roles.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                )}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Create new user
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
                    Successfully created a new user. Please forward this info to the user.
                  </DialogContentText>
                  <DialogContentText className={classes.boldText}>
                    Username: {newUsername}
                  </DialogContentText>
                  <DialogContentText className={classes.boldText}>
                    Password: {newPassword}
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

export default CreateUserPage;
