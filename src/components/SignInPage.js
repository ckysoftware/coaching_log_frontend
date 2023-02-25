import React, { useContext, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import useAuth from '../hooks/useAuth';
import { UserContext } from '../contexts/UserContext';
import LoadingPage from "./LoadingPage";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="http://localhost:3000/">
        WeDerm Limited
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignInPage() {
  const {user, isLoading} = useContext(UserContext);


  const classes = useStyles();

  const { handleSubmit, control, setError, trigger} = useForm();
  const { loginUser } = useAuth();

  const [openForgotDialog, setOpenForgotDialog] = useState(false)

  const handleForgotClick = () => {
    setOpenForgotDialog(true);
  };

  const handleCloseForgotDialog = () => {
      setOpenForgotDialog(false);
  };

  const onSubmit = async (data) => {
      await loginUser(data).catch(err => {
        console.log(err.response);
        if (err.response.data.detail === "Incorrect username or password") {
          setError("username", {
            type: "manual",
            message: "Incorrect username or password",
          });
          setError("password", {
            type: "manual",
            message: "Incorrect username or password",
          });
        };
      });
  };

  if (user) {
   return <Redirect to='/coaching-log/home'/>
  };

  return (
    <div>
      {isLoading ? <LoadingPage/> :
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
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
                  autoComplete="username"
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
              name="password"
              control={control}
              defaultValue=""
              rules={{ required: 'Password is required'}}
              render={({ field: { onChange, value }, fieldState: { error }, ...props }) => (
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
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
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link variant="body2" onClick={handleForgotClick}>
                  Forgot password?
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
        <Box mt={8}>
          <Copyright />
        </Box>
        <Dialog
            open={openForgotDialog}
            onClose={handleCloseForgotDialog}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">{"Forgot password"}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                Please contact Harrison Li for more information.
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCloseForgotDialog} color="primary">
                    OK
                </Button>
            </DialogActions>
        </Dialog>
      </Container>
    }
  </div>
  );
}
