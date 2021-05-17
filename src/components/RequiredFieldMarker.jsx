import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  root: {
    color: 'red !important',
  },
}));

function RequiredFieldMarker() {
  const classes = useStyles();

  return <span className={'required-field-marker ' + classes.root}>*</span>;
}

RequiredFieldMarker.propTypes = {};

export default RequiredFieldMarker;
