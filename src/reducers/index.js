import { combineReducers } from 'redux';
import loginResponse from './loginReducer';
import getAllZoneReducer from './getAllZoneReducer';
import getSitesBasedOnZoneIdReducer from './getSitesBasedOnZoneIdReducer';
import getSlotsBasedOnSiteIdReducer from './getSlotsBasedOnSiteIdReducer';
import getSlotDetailsBasedOnSlotIdReducer from './getSlotDetailsBasedOnSlotIdReducer';
import getAvailableSlotDetailsBasedOnSiteIdReducer from './getAvailableSlotDetailsBasedOnSiteIdReducer';
import showSnackBarMessageReducer from './showSnackBarMessageReducer';
import putSiteStatusReducer from './putSiteStatusReducer';
import getMachineryDowntimeAuditReducer from './getMachineryDowntimeAuditReducer';

const reducers = combineReducers({
  loginResponse,
  getAllZoneReducer,
  getSitesBasedOnZoneIdReducer,
  getSlotsBasedOnSiteIdReducer,
  getSlotDetailsBasedOnSlotIdReducer,
  getAvailableSlotDetailsBasedOnSiteIdReducer,
  showSnackBarMessageReducer,
  putSiteStatusReducer,
  getMachineryDowntimeAuditReducer,
});

export default reducers;
