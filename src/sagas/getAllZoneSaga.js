import { put, call } from 'redux-saga/effects';
import { actionTypes } from '../utils/actionTypes';
import { callFetchApi } from '../services/api';
import { apiUrls } from '../utils/constants';
import { getCookie, isTokenAlive } from '../utils/CommonUtils';

export default function* getAllZoneSaga() {
  try {
    let token = getCookie('lrToken');
    if (token !== '' && isTokenAlive(token)) {
      const response = yield call(callFetchApi, apiUrls.allZones, {}, 'GET', {}, token);
      yield put({
        type: actionTypes.GET_ALL_ZONES_SUCCESS,
        response: response.data,
      });
    } else {
      yield put({
        type: actionTypes.ROUTE_TO_PATH,
        payload: { path: '/' },
      });
    }
  } catch (e) {
    yield put({
      type: actionTypes.GET_ALL_ZONES_FAILURE,
      error: e,
    });
  }
}
