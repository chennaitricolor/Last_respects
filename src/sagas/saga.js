import { takeLatest } from 'redux-saga/effects';
import { actionTypes } from '../utils/actionTypes';
import loginSaga from './loginSaga';
import routeURLSaga from './routeURLSaga';

export default function* saga() {
  yield takeLatest(actionTypes.INITIATE_LOGIN, loginSaga);
  yield takeLatest(actionTypes.ROUTE_TO_PATH, routeURLSaga);
}
