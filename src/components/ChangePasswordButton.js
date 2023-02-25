import React, {useState} from 'react';

import qs from 'qs';
import axios from 'axios';

import { useForm, Controller } from 'react-hook-form';

import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContentText from '@material-ui/core/DialogContentText';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    box: {
        display: "flex",
        justifyContent: "left",
        alignItems: "left",
        marginTop: theme.spacing(4),
        marginLeft: theme.spacing(4),
    },
    button: {
        marginTop: theme.spacing(4),
        marginBottom: theme.spacing(4),
        textAlign: 'center',
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
}));


export default function ChangePasswordButton() {
  const classes = useStyles();

  const api_url = process.env.REACT_APP_API_URL;

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    reset();
  };

  const [openAckDialog, setOpenAckDialog] = useState(false);
  const handleCloseAckDialog = () => {
    setOpenAckDialog(false);
    window.location.reload();
  };

  const { handleSubmit, watch, reset, control, trigger, setError } = useForm();

  const onSubmit = async (data) => {
    const current_password = data.currentPW;
    const new_password = data.newPW;
    const payload = qs.stringify({current_password, new_password})
    const headers = {'Content-Type': 'application/x-www-form-urlencoded'}
    await axios.post(`${api_url}settings/change-password`, payload, {headers: headers}
    ).then(async (res) => {
      setOpenAckDialog(true);
    }).catch(err => {
      console.log(err.response);
      if (err.response.data.detail === "Incorrect password") {
        setError("currentPW", {
          type: "manual",
          message: "Current password is incorrect",
        })
      };
    });
  };

  return (
    <div>
      <Box className={classes.box}>
        <Button variant="contained" color="primary" onClick={handleClickOpen}>
          Change password
        </Button>
      </Box>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Change password</DialogTitle>
        <DialogContent>
          <form className={classes.form} noValidate>
            <Controller
              name="currentPW"
              control={control}
              defaultValue=""
              rules={{ required: 'Current password is required'}}
              render={({ field: { onChange, value }, fieldState: { error } }) => (
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="currentPW"
                  name="currentPW"
                  label="Current password"
                  type="password"
                  autoFocus
                  value={value}
                  onChange={onChange}
                  error={!!error}
                  helperText={error ? error.message : null}
                />
              )}
            />
            <Controller
              name="newPW"
              control={control}
              defaultValue=""
              rules={{ required: 'New password is required', validate: v => v===watch("confirmNewPW")}}
              render={({ field: { onChange, value }, fieldState: { error }, ...props }) => (
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="newPW"
                  name="newPW"
                  label="New password"
                  type="password"
                  error={!!error}
                  onChange={(event) => {
                    if (props.formState.isSubmitted) {trigger()}
                    onChange(event.target.value);
                  }}
                  value={value}
                  helperText={error ? (error.type==="required" ? error.message : "The new passwords do not match") : null}
                />
              )}
            />
            <Controller
              name="confirmNewPW"
              control={control}
              defaultValue=""
              rules={{ required: 'New password is required', validate: v => v===watch("newPW")}}
              render={({ field: { onChange, value }, fieldState: { error }, ...props }) => (
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="confirmNewPW"
                  name="confirmNewPW"
                  label="Confirm new password"
                  type="password"
                  error={!!error}
                  onChange={(event) => {
                    if (props.formState.isSubmitted) {trigger()}
                    onChange(event.target.value);
                  }}
                  value={value}
                  helperText={error ? (error.type==="required" ? error.message : "The new passwords do not match") : null}
                />
              )}
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit(onSubmit)} color="primary">
            Change password
          </Button>
        </DialogActions>
        <Dialog
            open={openAckDialog}
            onClose={handleCloseAckDialog}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">{"Acknowledgement"}</DialogTitle>
            <DialogContent>
                <DialogContentText>
                  Successfully changed password.
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCloseAckDialog} color="primary" autoFocus>
                    OK
                </Button>
            </DialogActions>
        </Dialog>
      </Dialog>
    </div>
  )
};
