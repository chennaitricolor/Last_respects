import { put, call } from 'redux-saga/effects';
import { actionTypes } from '../utils/actionTypes';
import { callFetchApi } from '../services/api';
import { apiUrls } from '../utils/constants';
import { getCookie, isTokenAlive } from '../utils/CommonUtils';

export default function* getSitesBasedOnZoneIdSaga(action) {
  try {
    let token = getCookie('lrToken');
    if (token !== '' && isTokenAlive(token)) {
      let api = apiUrls.getSitesBasedOnZoneId.replace(':zoneId', action.payload.zoneId);
      const response = yield call(callFetchApi, api, {}, 'GET', {}, token);
      yield put({
        type: actionTypes.GET_SITES_BASED_ZONE_ID_SUCCESS,
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
      type: actionTypes.GET_SITES_BASED_ZONE_ID_FAILURE,
      error: e,
    });
  }
}
