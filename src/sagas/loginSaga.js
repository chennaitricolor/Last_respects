import { put, call } from 'redux-saga/effects';
import { actionTypes } from '../utils/actionTypes';
import { callFetchApi } from '../services/api';
import { apiUrls } from '../utils/constants';
import { setCookie } from '../utils/CommonUtils';

export default function* loginSaga(action) {
  try {
    const response = yield call(callFetchApi, apiUrls.login, {}, 'POST', action.payload);
    if (response.data !== undefined && response.data.auth) {
      setCookie('lrToken', response.data.token);
      setCookie('lrRefreshToken', response.data.refreshToken);
      yield put({
        type: actionTypes.LOGIN_SUCCESS,
        response: response.data,
      });
      yield put({
        type: actionTypes.ROUTE_TO_PATH,
        payload: { path: '/slotBooking' },
      });
    } else {
      yield put({
        type: actionTypes.LOGIN_FAILURE,
        response: 'Unauthorized',
      });
    }
  } catch (e) {
    yield put({
      type: actionTypes.LOGIN_FAILURE,
      response: 'Unauthorized',
    });
  }
}
