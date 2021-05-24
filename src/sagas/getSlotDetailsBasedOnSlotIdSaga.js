import { put, call } from 'redux-saga/effects';
import { actionTypes } from '../utils/actionTypes';
import { callFetchApi } from '../services/api';
import { apiUrls } from '../utils/constants';
import { getCookie, isTokenAlive } from '../utils/CommonUtils';

export default function* getSlotDetailsBasedOnSlotIdSaga(action) {
  try {
    let token = getCookie('lrToken');
    if (token !== '' && isTokenAlive(token)) {
      let api = apiUrls.getSlotDetailsBasedOnSlotId.replace(':slotId', action.payload.slotId);
      const response = yield call(callFetchApi, api, {}, 'GET', {}, token);
      yield put({
        type: actionTypes.GET_SLOT_DETAILS_BASED_SLOT_ID_SUCCESS,
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
      type: actionTypes.GET_SLOT_DETAILS_BASED_SLOT_ID_FAILURE,
      error: e,
    });
  }
}
