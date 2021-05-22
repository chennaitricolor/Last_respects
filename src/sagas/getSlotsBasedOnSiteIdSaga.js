import { put, call } from 'redux-saga/effects';
import { actionTypes } from '../utils/actionTypes';
import { callFetchApi } from '../services/api';
import { apiUrls } from '../utils/constants';
import { getCookie, isTokenAlive } from '../utils/CommonUtils';

export default function* getSlotsBasedOnSiteIdSaga(action) {
  try {
    let token = getCookie('lrToken');
    if (token !== '' && isTokenAlive(token)) {
      let api = apiUrls.getSlotsBasedOnSiteId.replace(':siteId', action.payload.siteId);
      const response = yield call(callFetchApi, api, {}, 'GET', {}, token);
      yield put({
        type: actionTypes.GET_SLOTS_BASED_SITE_ID_SUCCESS,
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
      type: actionTypes.GET_SLOTS_BASED_SITE_ID_FAILURE,
      error: e,
    });
  }
}
