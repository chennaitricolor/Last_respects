import { put } from 'redux-saga/effects';
import { actionTypes } from '../utils/actionTypes';
import { deleteCookie } from '../utils/CommonUtils';

export default function* logoutSaga() {
  try {
    deleteCookie('lrToken');
    deleteCookie('lrRefreshToken');
    yield put({
      type: actionTypes.LOGOUT_SUCCESS,
    });
    yield put({
      type: actionTypes.ROUTE_TO_PATH,
      payload: { path: '/' },
    });
  } catch (e) {
    yield put({
      type: actionTypes.LOGOUT_FAILURE,
      error: 'Unauthorized',
    });
  }
}
