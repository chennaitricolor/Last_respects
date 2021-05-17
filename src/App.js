import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Route, Switch } from "react-router-dom";
import BaseContainer from "./containers/BaseContainer";
import SlotBookingContainer from "./containers/SlotBookingContainer";
import "./App.css";

import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

const top100Films = [
  { title: "The Shawshank Redemption", year: 1994 },
  { title: "The Godfather", year: 1972 },
  { title: "The Godfather: Part II", year: 1974 },
  { title: "The Dark Knight", year: 2008 },
  { title: "12 Angry Men", year: 1957 },
];

const useStyles = makeStyles({
  //card start
  root: {
    minWidth: 275,
    marginRight : 10,
    marginLeft: 10
  },
  pos: {
    marginBottom: 12,
  },
  //card end
});

const App = () => {
  const classes = useStyles();
  return (
    <div className="App">
      <BaseContainer>
        <Switch>
          <Route path="/slotbooking">
            <SlotBookingContainer />
          </Route>
        </Switch>
        {/** */}

        <div className="baseContainer">
          {/** Slot Booking Header */}
          <div className="slotBookingHeader">
            <div className="row">
              <div className="col-6 ">
                <Autocomplete
                  id="combo-box-demo"
                  options={top100Films}
                  getOptionLabel={(option) => option.title}
                  style={{ width: 300 }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Zone Name"
                      variant="outlined"
                    />
                  )}
                />
              </div>
              <div className="col-6 ">
                <Autocomplete
                  id="combo-box-demo"
                  options={top100Films}
                  getOptionLabel={(option) => option.title}
                  style={{ width: 300 }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Site Name"
                      variant="outlined"
                    />
                  )}
                />
              </div>
              <div className="col-12 ">
                <ul>
                  <li className="col-md-4">
                    {" "}
                    <label>Site Name : </label>
                    <span>{""} </span>
                  </li>

                  <li>
                    {" "}
                    <label className="col-md-4">Contact : </label>
                    <span>{""} </span>
                  </li>

                  <li>
                    {" "}
                    <label className="col-md-4">Address : </label>
                    <span>{""} </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          {/** Slot Booking Container */}
          <div className="slotBookingContainer">
            <div className="row ml-auto">
              <label> Slot Booking </label>
            </div>
            <div className="row ml-auto">
              <label> Date </label>
            </div>
            <div className="dateSelection row">
              <Card className={classes.root}>
                <CardContent>
                  <Typography
                    className={classes.pos}
                    variant="h5"
                    component="h2"
                  >
                    16
                  </Typography>
                </CardContent>
              </Card>
              <Card className={classes.root}>
                <CardContent>
                  <Typography
                    className={classes.pos}
                    variant="h5"
                    component="h2"
                  >
                    17
                  </Typography>
                </CardContent>
              </Card>
            </div>
            <div className= "slotSelection  mx-auto">
            <Card className={classes.root}>
                <CardContent>
                  <Typography
                    className={classes.pos}
                    variant="h5"
                    component="h2"
                  >
                    8:00 AM to 8:45 AM
                  </Typography>
                </CardContent>
              </Card>
              <Card className={classes.root}>
                <CardContent>
                  <Typography
                    className={classes.pos}
                    variant="h5"
                    component="h2"
                  >
                    8:45 AM to 9:30 AM
                  </Typography>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
        {/**  */}
      </BaseContainer>
    </div>
  );
};

export default App;
