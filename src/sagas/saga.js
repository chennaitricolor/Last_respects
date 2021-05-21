import { takeLatest } from 'redux-saga/effects';
import { actionTypes } from '../utils/actionTypes';
import loginSaga from './loginSaga';
import routeURLSaga from './routeURLSaga';
import getAllZoneSaga from "./getAllZoneSaga";

export default function* saga() {
  yield takeLatest(actionTypes.INITIATE_LOGIN, loginSaga);
  yield takeLatest(actionTypes.ROUTE_TO_PATH, routeURLSaga);
  yield takeLatest(actionTypes.GET_ALL_ZONES, getAllZoneSaga);
}
