import { actionTypes } from '../utils/actionTypes';

const defaultState = {
  isLoading: false,
  siteList: [],
  error: '',
  isActive: false,
};

const getSitesBasedOnZoneIdReducer = (state = defaultState, action) => {
  switch (action.type) {
    case actionTypes.GET_SITES_BASED_ZONE_ID:
      return Object.assign({}, state, { isLoading: true, siteList: [], error: '' });
    case actionTypes.GET_SITES_BASED_ZONE_ID_SUCCESS:
      return Object.assign({}, state, { isLoading: false, siteList: action.response, error: '' });
    case actionTypes.GET_SITES_BASED_ZONE_ID_FAILURE:
      return Object.assign({}, state, { isLoading: false, siteList: [], error: action.error });
    case actionTypes.SET_ACTIVE_FLAG:
      return Object.assign({}, state, { isLoading: false, isActive: action.payload.isActive });
    case actionTypes.RESET_DATA_UNMOUNT_SLOT_BOOKING:
      return Object.assign({}, state, defaultState);
    default:
      return state;
  }
};

export default getSitesBasedOnZoneIdReducer;
