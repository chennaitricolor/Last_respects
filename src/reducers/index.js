import { combineReducers } from 'redux';
import loginResponse from './loginReducer';
import getAllZoneReducer from './getAllZoneReducer';
import getSitesBasedOnZoneIdReducer from './getSitesBasedOnZoneIdReducer';
import getSlotsBasedOnSiteIdReducer from './getSlotsBasedOnSiteIdReducer';
import getSlotDetailsBasedOnSlotIdReducer from './getSlotDetailsBasedOnSlotIdReducer';

const reducers = combineReducers({
  loginResponse,
  getAllZoneReducer,
  getSitesBasedOnZoneIdReducer,
  getSlotsBasedOnSiteIdReducer,
  getSlotDetailsBasedOnSlotIdReducer,
});

export default reducers;
