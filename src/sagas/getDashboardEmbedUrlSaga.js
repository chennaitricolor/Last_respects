import { put, call } from 'redux-saga/effects';
import { actionTypes } from '../utils/actionTypes';
import { callFetchApi } from '../services/api';
import { apiUrls } from '../utils/constants';
import { getCookie, isTokenAlive } from '../utils/CommonUtils';

export default function* getDashboardEmbedUrlSaga() {
  try {
    let cookieToken = getCookie('lrToken');
    if (cookieToken !== '' && isTokenAlive(cookieToken)) {
      const response = yield call(callFetchApi, apiUrls.getDashboardURL, {}, 'GET', {}, cookieToken);
      if (response.data !== undefined && response.data.success) {
        yield put({
          type: actionTypes.GET_DASHBOARD_EMBED_URL_SUCCESS,
          response: response.data,
        });
      }
    } else {
      yield put({
        type: actionTypes.ROUTE_TO_PATH,
        payload: { path: '/' },
      });
    }
  } catch (e) {
    if (e.response.data !== undefined && e.response.data.message === 'Unauthorized to access the resource') {
      yield put({
        type: actionTypes.ROUTE_TO_PATH,
        payload: { path: '/slotBooking' },
      });
    }
    yield put({
      type: actionTypes.GET_DASHBOARD_EMBED_URL_FAILURE,
      error: e,
    });
  }
}
