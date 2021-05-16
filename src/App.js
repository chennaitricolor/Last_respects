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
            <SlotBookingContainer/>
          </Route>
        </Switch>
      </BaseContainer>
    </div>
  );
};

export default App;
