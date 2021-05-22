import { combineReducers } from 'redux';
import loginResponse from './loginReducer';
import getAllZoneReducer from './getAllZoneReducer';
import getSitesBasedOnZoneIdReducer from './getSitesBasedOnZoneIdReducer';
import getSlotsBasedOnSiteIdReducer from './getSlotsBasedOnSiteIdReducer';

const reducers = combineReducers({
  loginResponse,
  getAllZoneReducer,
  getSitesBasedOnZoneIdReducer,
  getSlotsBasedOnSiteIdReducer,
});

export default reducers;
