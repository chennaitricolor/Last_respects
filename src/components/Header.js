/* eslint-disable */
import { makeStyles } from "@material-ui/core/styles";
import React from 'react';

const useStyles = makeStyles({
  header: {
    position: "absolute",
    width: "100%",
    height: 60,
    left: 0,
    top: 0,
    background: "#2F80ED"
  },
});

const Header = () => { 
  const classes = useStyles();
  return (
    <header>
        <div className={`row ${classes.header} `} />
    </header>
  )
};

export default Header;
