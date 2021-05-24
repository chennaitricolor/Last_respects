import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  root: {
    color: 'red !important',
  },
}));

function ErrorMessage() {
  const classes = useStyles();

  return <span className={'required-field-marker ' + classes.root}>Error Occurred. Please try again Later </span>;
}

ErrorMessage.propTypes = {};

export default ErrorMessage;
