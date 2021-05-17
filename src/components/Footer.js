import React from 'react';
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  footer: {
    position: "absolute",
    width: "100%",
    height: 60,
    left: 0,
    bottom: 56,
    background: "#2F80ED"
  },
});

const Footer = () => {
  const classes = useStyles();
  return (
   <footer>
     <div className={`row ${classes.footer} `} />
   </footer>
  );
};

export default Footer;
