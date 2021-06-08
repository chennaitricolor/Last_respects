import { put, call } from 'redux-saga/effects';
import { actionTypes } from '../utils/actionTypes';
import { callFetchApi } from '../services/api';
import { apiUrls } from '../utils/constants';
import { getCookie, isTokenAlive } from '../utils/CommonUtils';

export default function* getAvailableSlotDetailsBasedOnSiteIdSaga(action) {
  try {
    let token = getCookie('lrToken');
    if (token !== '' && isTokenAlive(token)) {
      let api = apiUrls.getAvailableSlotDetailsBasedOnSiteId.replace(':siteId', action.payload.siteId)
                .replace(':date',action.payload.date ).replace(':availableFlag',action.payload.availableFlag );
      const response = yield call(callFetchApi, api, {}, 'GET', {}, token);
      yield put({
        type: actionTypes.GET_AVAILABLE_SLOT_DETAILS_BASED_SITE_ID_SUCCESS,
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
      type: actionTypes.GET_AVAILABLE_SLOT_DETAILS_BASED_SITE_ID_FAILURE,
      error: e,
    });
  }
}
