import React from "react";
import {
  Route,
  Switch
} from 'react-router-dom';
import "./App.css";
import BaseContainer from './containers/BaseContainer';
import SlotBookingContainer from "./containers/SlotBookingContainer";

const App = () => {
  return (
    <div className="App">
      <BaseContainer>
        <Switch>
          <Route path="/slotbooking">
            <SlotBookingContainer />
          </Route>
        </Switch>
    {/** */}

        <div class="baseContainer">
          <div class="container">
            <div class="row">
              <div class="col-6 ">
                <label>Zone Name</label>
                <Dropdown placeholder="Zone Name" value={selectedZone} options={zoneList} class="graph-select"
                />
              </div>
              <div class="col-6 ">
                <label>Site Name</label>
                <Dropdown placeholder="Site Name" value={selectedSite} options={siteList} disabled={isSiteDisabled}
                  class="graph-select"
                />
              </div>
              <div class="col-12 ">
                <ul>
                  <li class="col-md-4"> <label>Site Name : </label>
                    <span>{""} </span>
                  </li>

                  <li> <label class="col-md-4">Contact : </label>
                    <span>{""} </span>
                  </li>

                  <li> <label class="col-md-4">Address : </label>
                    <span>{""} </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
       {/**  */}
      </BaseContainer>
    </div>
  );
};

export default App;
