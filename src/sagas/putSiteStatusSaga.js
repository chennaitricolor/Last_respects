import { put, call } from 'redux-saga/effects';
import { actionTypes } from '../utils/actionTypes';
import { callFetchApi } from '../services/api';
import { apiUrls } from '../utils/constants';
import { getCookie, isTokenAlive } from '../utils/CommonUtils';

export default function* putSiteStatusSaga(action) {
  try {
    let token = getCookie('lrToken');
    if (token !== '' && isTokenAlive(token)) {
      let api = apiUrls.updateSiteStatus.replace(':siteId', action.payload.siteId);
      action.payload.status = Boolean(action.payload.status) ? 'AVAILABLE' : 'UNAVAILABLE';
      const response = yield call(callFetchApi, api, {}, 'PUT', action.payload, token);
      yield put({
        type: actionTypes.PUT_SITE_STATUS_SUCCESS,
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
      type: actionTypes.PUT_SITE_STATUS_FAILURE,
      error: e,
    });
  }
}
