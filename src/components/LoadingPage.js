import React from 'react';
import ReactLoading from 'react-loading';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  loading: {
    position: "relative",
    top: "30%",
    left: "50%",
    transform: "translate(-50%, -50%)"
  },
}));

export default function LoadingPage() {
  const classes = useStyles();

  return (
    <div className={classes.loading}>
      <ReactLoading type={"spin"} color={"ffffff"} height={60} width={60} className={classes.loading}/>
    </div>
  )
}
