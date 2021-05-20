/* eslint-disable */
import { makeStyles } from "@material-ui/core/styles";
import React from 'react';

const useStyles = makeStyles({
  header: {
    height: 60,
    background: "#2F80ED"
  },
});

const Header = () => { 
  const classes = useStyles();
  return (
    <header className ="container-fluid">
        <div className={`row ${classes.header}`} />
    </header>
  )
};

export default Header;