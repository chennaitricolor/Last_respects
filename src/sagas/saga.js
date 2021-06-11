import { takeLatest } from 'redux-saga/effects';
import { actionTypes } from '../utils/actionTypes';
import loginSaga from './loginSaga';
import logoutSaga from './logoutSaga';
import routeURLSaga from './routeURLSaga';
import getAllZoneSaga from './getAllZoneSaga';
import getSitesBasedOnZoneIdSaga from './getSitesBasedOnZoneIdSaga';
import getSlotsBasedOnSiteIdSaga from './getSlotsBasedOnSiteIdSaga';
import getSlotDetailsBasedOnSlotIdSaga from './getSlotDetailsBasedOnSlotIdSaga';
import getAvailableSlotDetailsBasedOnSiteIdSaga from './getAvailableSlotDetailsBasedOnSiteIdSaga';
import putSiteStatusSaga from './putSiteStatusSaga';
import getMachineryDowntimeAuditSaga from './getMachineryDowntimeAuditSaga';

export default function* saga() {
  yield takeLatest(actionTypes.INITIATE_LOGIN, loginSaga);
  yield takeLatest(actionTypes.INITIATE_LOGOUT, logoutSaga);
  yield takeLatest(actionTypes.ROUTE_TO_PATH, routeURLSaga);
  yield takeLatest(actionTypes.GET_ALL_ZONES, getAllZoneSaga);
  yield takeLatest(actionTypes.GET_SITES_BASED_ZONE_ID, getSitesBasedOnZoneIdSaga);
  yield takeLatest(actionTypes.GET_SLOTS_BASED_SITE_ID, getSlotsBasedOnSiteIdSaga);
  yield takeLatest(actionTypes.GET_SLOT_DETAILS_BASED_SLOT_ID, getSlotDetailsBasedOnSlotIdSaga);
  yield takeLatest(actionTypes.GET_AVAILABLE_SLOT_DETAILS_BASED_SITE_ID, getAvailableSlotDetailsBasedOnSiteIdSaga);
  yield takeLatest(actionTypes.PUT_SITE_STATUS, putSiteStatusSaga);
  yield takeLatest(actionTypes.GET_DOWNTIME_AUDIT, getMachineryDowntimeAuditSaga);
}
