import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Route, Switch } from "react-router-dom";
import BaseContainer from "./containers/BaseContainer";
import SlotBookingContainer from "./containers/SlotBookingContainer";
import "./App.css";

import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Radio from '@material-ui/core/Radio';
import Button from '@material-ui/core/Button';
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
    marginRight: 10,
    marginLeft: 10
  },
  pos: {
    marginBottom: 12,
  },
  rowFullWidth: {
    width: "100%"
  },
  timeSlot: {
    listStyleType: "none",
    margin: 0,
    padding: 0,
    height:"100%"
  },

  //card end
});

const App = () => {
  const classes = useStyles();
  const [selectedValue, setSelectedValue] = React.useState('a');

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };
  return (
    <div className="App">
      <BaseContainer>
        <Switch>
          <Route path="/slotbooking">
            <SlotBookingContainer />
          </Route>
        </Switch>
        {/** */}


        {/**  */}

        <div className="container">
          <div className={`row ${classes.rowFullWidth} slotheader `}>
            <div className="col-12 col-md-3 dropdown">
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
            <div className="col-12 col-md-3 drodown">
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
            <div className="col-12 col-md-2 text">
              text
            </div>
            <div className="col-12 col-md-2 text">
              text
            </div>
            <div className="col-12 col-md-2 text">
              text
            </div>
          </div>
          <div className={`row ${classes.rowFullWidth} slotContent `}>
            <div className={`row ${classes.rowFullWidth} `}>
              <h2> Slot Booking</h2>
            </div>
            <div className={`row ${classes.rowFullWidth} dateSelection `}>
              <div className={`row m-1 p-0 ${classes.rowFullWidth} `}>
                <h6>Date</h6>
              </div>
              <div className="col-2">
                Date Component
                    </div>
              <div className="col-2">
                Date Component
                    </div>
              <div className="col-2">
                Date Component
                    </div>
              <div className="col-2">
                Date Component
                    </div>
            </div>
            <div className={`row ${classes.rowFullWidth} `}>
              <div className={`row m-1 p-0 ${classes.rowFullWidth} `}>
                <h5>Time</h5>
              </div>
              <div className="col-3 ">
              </div>
              <ul className={` ${classes.timeSlot} ${classes.rowFullWidth} `}>
                <li>
                  Slot time
                            </li>
                <li>
                  Slot time
                            </li>
                <li>
                  Slot time
                            </li>
                <li>
                  Slot time
                            </li>
              </ul>
            </div>
            <div className="col-9">
              <div className="row displaydate">

              </div>
              <div className="row htmlform">

              </div>
              <div className="row status">
                <div className="col-2">
                  <Radio
                    checked={selectedValue === 'a'}
                    onChange={handleChange}
                    value="a"
                    name="radio-button-demo"
                    inputProps={{ 'aria-label': 'A' }}
                  />
                </div>
                <div className="col-2">
                  <Radio
                    checked={selectedValue === 'a'}
                    onChange={handleChange}
                    value="a"
                    name="radio-button-demo"
                    inputProps={{ 'aria-label': 'A' }}
                  />
                </div>
                <div className="col-2">
                  <Radio
                    checked={selectedValue === 'a'}
                    onChange={handleChange}
                    value="a"
                    name="radio-button-demo"
                    inputProps={{ 'aria-label': 'A' }}
                  />
                </div>
                <div className="col-2">
                  <Radio
                    checked={selectedValue === 'a'}
                    onChange={handleChange}
                    value="a"
                    name="radio-button-demo"
                    inputProps={{ 'aria-label': 'A' }}
                  />
                </div>
              </div>
              <div className="row buttons">

              </div>
            </div>

          </div>
        </div>
      </BaseContainer>
    </div >
  );
};

export default App;
