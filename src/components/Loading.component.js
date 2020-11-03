import React from 'react';
import Backdrop from '@material-ui/core/Backdrop';
import { makeStyles } from '@material-ui/core/styles';
import PacmanLoader from './pacman-loader.svg';

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

export default function SimpleBackdrop() {
  const classes = useStyles();

  return (
    <div>
      <Backdrop className={classes.backdrop} open={true}>
        <img src={PacmanLoader} />
      </Backdrop>
    </div>
  );
}