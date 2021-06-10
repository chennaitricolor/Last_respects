import { actionTypes } from '../utils/actionTypes';

const defaultState = {
  isLoading: false,
  error: '',
};

const putSiteStatusReducer = (state = defaultState, action) => {
  switch (action.type) {
    case actionTypes.PUT_SITE_STATUS:
      return Object.assign({}, state, { isLoading: true });
    case actionTypes.PUT_SITE_STATUS_SUCCESS:
      return Object.assign({}, state, { isLoading: false });
    case actionTypes.PUT_SITE_STATUS_FAILURE:
    default:
      return state;
  }
};

export default putSiteStatusReducer;
