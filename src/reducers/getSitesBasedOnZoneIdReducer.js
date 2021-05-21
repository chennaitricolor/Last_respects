import { actionTypes } from '../utils/actionTypes';

const defaultState = {
  isLoading: false,
  siteList: [],
  error: '',
};

const getSitesBasedOnZoneIdReducer = (state = defaultState, action) => {
  switch (action.type) {
    case actionTypes.GET_SITES_BASED_ZONE_ID:
      return Object.assign({}, state, { isLoading: true });
    case actionTypes.GET_SITES_BASED_ZONE_ID_SUCCESS:
      return Object.assign({}, state, { isLoading: false, siteList: action.response });
    case actionTypes.GET_SITES_BASED_ZONE_ID_FAILURE:
      return Object.assign({}, state, { isLoading: false, error: action.error });
    default:
      return state;
  }
};

export default getSitesBasedOnZoneIdReducer;
