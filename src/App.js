import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Route, Switch } from 'react-router-dom';
import BaseContainer from './containers/BaseContainer';
import SlotBookingContainer from './containers/SlotBookingContainer';
import MachineryManagementContainer from './containers/MachineryManagementContainer';
import './App.css';

const useStyles = makeStyles({
  //card start
  dateCard: {
    minWidth: 175,
    marginRight: 0,
    marginLeft: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
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
  overflowHidden: {
    overflow: 'hidden',
  },
  rowFullWidth: {
    width: '100%',
  },
  timeSlotWrapper: {
    listStyleType: 'none',
    margin: 0,
    padding: 0,
    height: '100%',
    maxHeight: 1000,
    overflow: 'auto',
  },
  timeSlot: {
    padding: '10px 15px',
    backgroundColor: '#ff0000',
    borderBottom: '2px solid #ccc',
    color: '#F2F2F2',
  },
  slotData: {
    background: '#EEFAFE',
    padding: 0,
  },
  autoComplete: {
    width: 235,
    height: 59,
    left: 111,
    top: 101,
  },
  customContainer: {
    maxWidth: 1500,
  },
  //card end
});

const App = () => {
  return (
    <div className="App">
      <BaseContainer>
        <Switch>
          <Route path="/slotBooking">
            <SlotBookingContainer />
          </Route>
          <Route path="/machinery">
            <MachineryManagementContainer />
          </Route>
        </Switch>
      </BaseContainer>
    </div>
  );
};

export default App;
