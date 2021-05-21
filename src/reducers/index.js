import { combineReducers } from 'redux';
import loginResponse from './loginReducer';
import getAllZoneReducer from './getAllZoneReducer';

const reducers = combineReducers({
  loginResponse,
  getAllZoneReducer,
});

export default reducers;
