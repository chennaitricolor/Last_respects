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
import LastRespectFormContainer from "./containers/LastRespectFormContainer";

const top100Films = [
  { title: "The Shawshank Redemption", year: 1994 },
  { title: "The Godfather", year: 1972 },
  { title: "The Godfather: Part II", year: 1974 },
  { title: "The Dark Knight", year: 2008 },
  { title: "12 Angry Men", year: 1957 },
];

const useStyles = makeStyles({
  //card start
  dateCard: {
    minWidth: 175,
    marginRight: 0,
    marginLeft: 0,
    display : "flex",
    justifyContent: "center",
    alignItems : "center",
    textAlign : "center"
  },
  timeCard: {
    minWidth: 50,
    minHeight: 10,
    padding: 3,
    margin: 3,
  },
  pos: {
    marginBottom: 12,
  },
  overflowHidden:{
    overflow:'hidden'
  },
  rowFullWidth: {
    width: "100%",
  },
  timeSlotWrapper: {
    listStyleType: "none",
    margin: 0,
    padding: 0,
    height: "100%",
    maxHeight: 1000,
    overflow: "auto"
  },
  timeSlot:{
    padding:'10px 15px',
    backgroundColor:'#ff0000',
    borderBottom:'2px solid #ccc',
    color:'#F2F2F2'
  },
  slotData: {
    background: "#EEFAFE",
    padding:0
  },
  autoComplete: {
    width: 235,
    height: 59,
    left: 111,
    top: 101,
  },
  customContainer:{
    maxWidth: 1500
  },
  slotheader : {
    display : "flex",
    alignItems : "center"
  }

  //card end
});

const App = () => {
  const classes = useStyles();
  const [selectedValue, setSelectedValue] = React.useState("a");

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

        <div className={`container ${classes.customContainer} mt-4`}>
          <div className={`row ${classes.slotheader} mb-4 mt-4`}>
            <div className="col-6 col-md-3 dropdown">
              <Autocomplete
                id="combo-box-demo"
                options={top100Films}
                getOptionLabel={(option) => option.title}
                style={{ width: '100%' }}
                renderInput={(params) => (
                  <TextField {...params} label="Zone Name" variant="outlined" />
                )}
              />
            </div>
            <div className="col-6 col-md-3 dropdown">
              <Autocomplete
                id="combo-box-demo"
                options={top100Films}
                getOptionLabel={(option) => option.title}
                style={{ width: '100%' }}
                renderInput={(params) => (
                  <TextField {...params} label="Zone Name" variant="outlined" />
                )}
              />
            </div>
            <div className="col-12 col-md-2 text">Name : </div>
            <div className="col-12 col-md-2 text">Contact : </div>
            <div className="col-12 col-md-2 text">Address : </div>
          </div>
          <div className={`row slotContent `}>
            <div className="col-12">
              <h4> Slot Booking</h4>
            </div>
            <div className={`col-12 ${classes.overflowHidden}`}>
              <h6>Date</h6>
              <div className="d-flex">
                <Card className={classes.dateCard}>
                  <CardContent>
                    <Typography
                      className={classes.pos}
                      variant="h5"
                      component="h2"
                    >
                      <div>
                        <p>{16}</p>
                        <p>{8 + ' Slots Available'}</p>
                      </div>
                    </Typography>
                  </CardContent>
                </Card>
              </div>
              <h6 className="mt-4">Time</h6>
              <div className="row">
                <div className="col-xs-12 col-md-3 pr-0">
                  <ul className={`${classes.timeSlotWrapper}`}>
                    <li className={`${classes.timeSlot}`}>
                      8:00 AM to 8:45 AM
                    </li>
                    <li className={`${classes.timeSlot}`}>
                      9:00 AM to 9:30 AM
                    </li>
                    <li className={`${classes.timeSlot}`}>
                      9:30 AM to 10:15 AM
                    </li>
                    <li className={`${classes.timeSlot}`}>
                      
                      10:15 AM to 11.00 AM
                    </li>
                    <li className={`${classes.timeSlot}`}>
                      8:00 AM to 8:45 AM
                    </li>
                    <li className={`${classes.timeSlot}`}>
                      9:00 AM to 9:30 AM
                    </li>
                    <li className={`${classes.timeSlot}`}>
                      9:30 AM to 10:15 AM
                    </li>
                    <li className={`${classes.timeSlot}`}>
                      
                      10:15 AM to 11.00 AM
                    </li>
                    <li className={`${classes.timeSlot}`}>
                      8:00 AM to 8:45 AM
                    </li>
                    <li className={`${classes.timeSlot}`}>
                      9:00 AM to 9:30 AM
                    </li>
                    <li className={`${classes.timeSlot}`}>
                      9:30 AM to 10:15 AM
                    </li>
                    <li className={`${classes.timeSlot}`}>
                      
                      10:15 AM to 11.00 AM
                    </li>
                    <li className={`${classes.timeSlot}`}>
                      8:00 AM to 8:45 AM
                    </li>
                    <li className={`${classes.timeSlot}`}>
                      9:00 AM to 9:30 AM
                    </li>
                    <li className={`${classes.timeSlot}`}>
                      9:30 AM to 10:15 AM
                    </li>
                    <li className={`${classes.timeSlot}`}>
                      
                      10:15 AM to 11.00 AM
                    </li>
                    <li className={`${classes.timeSlot}`}>
                      8:00 AM to 8:45 AM
                    </li>
                    <li className={`${classes.timeSlot}`}>
                      9:00 AM to 9:30 AM
                    </li>
                    <li className={`${classes.timeSlot}`}>
                      9:30 AM to 10:15 AM
                    </li>
                    <li className={`${classes.timeSlot}`}>
                      
                      10:15 AM to 11.00 AM
                    </li>
                    <li className={`${classes.timeSlot}`}>
                      8:00 AM to 8:45 AM
                    </li>
                    <li className={`${classes.timeSlot}`}>
                      9:00 AM to 9:30 AM
                    </li>
                    <li className={`${classes.timeSlot}`}>
                      9:30 AM to 10:15 AM
                    </li>
                    <li className={`${classes.timeSlot}`}>
                      
                      10:15 AM to 11.00 AM
                    </li>
                    <li className={`${classes.timeSlot}`}>
                      8:00 AM to 8:45 AM
                    </li>
                    <li className={`${classes.timeSlot}`}>
                      9:00 AM to 9:30 AM
                    </li>
                    <li className={`${classes.timeSlot}`}>
                      9:30 AM to 10:15 AM
                    </li>
                    <li className={`${classes.timeSlot}`}>
                      
                      10:15 AM to 11.00 AM
                    </li>
                    <li className={`${classes.timeSlot}`}>
                      8:00 AM to 8:45 AM
                    </li>
                    <li className={`${classes.timeSlot}`}>
                      9:00 AM to 9:30 AM
                    </li>
                    <li className={`${classes.timeSlot}`}>
                      9:30 AM to 10:15 AM
                    </li>
                    <li className={`${classes.timeSlot}`}>
                      
                      10:15 AM to 11.00 AM
                    </li>
                  </ul>
                </div>
                <div className={`col-9 ${classes.slotData}`}>
                  <h4 className="col-12 displaydate"> Date & Time Slot : 15/12/2021 & 9.30am to 10.15 am </h4>
                  <div className="form col-12">
                      <LastRespectFormContainer/>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </BaseContainer>
    </div>
  );
};

export default App;
