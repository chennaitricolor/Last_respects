import { actionTypes } from '../utils/actionTypes';

const defaultState = {
  isLoading: false,
  zoneList: [],
  error: '',
  zoneName: 'Zone1',
};

const getAllZoneReducer = (state = defaultState, action) => {
  switch (action.type) {
    case actionTypes.GET_ALL_ZONES:
      return Object.assign({}, state, { isLoading: true });
    case actionTypes.GET_ALL_ZONES_SUCCESS:
      return Object.assign({}, state, { isLoading: false, zoneList: action.response });
    case actionTypes.GET_ALL_ZONES_FAILURE:
      return Object.assign({}, state, { isLoading: false, error: action.error });
    case actionTypes.SET_ZONE_AND_SITE_NAME:
      return Object.assign({}, state, { payload: action.payload });
    case actionTypes.RESET_DATA_UNMOUNT_SLOT_BOOKING:
      return Object.assign({}, state, defaultState);
    case actionTypes.LOGOUT_SUCCESS:
      return Object.assign({}, state, defaultState);
    default:
      return state;
  }
};

export default getAllZoneReducer;
