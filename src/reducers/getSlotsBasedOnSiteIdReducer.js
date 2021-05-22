import { actionTypes } from '../utils/actionTypes';

const defaultState = {
  isLoading: false,
  slotList: [],
  error: '',
};

const getSlotsBasedOnSiteIdReducer = (state = defaultState, action) => {
  switch (action.type) {
    case actionTypes.GET_SLOTS_BASED_SITE_ID:
      return Object.assign({}, state, { isLoading: true });
    case actionTypes.GET_SLOTS_BASED_SITE_ID_SUCCESS:
      return Object.assign({}, state, { isLoading: false, slotList: action.response });
    case actionTypes.GET_SLOTS_BASED_SITE_ID_FAILURE:
      return Object.assign({}, state, { isLoading: false, error: action.error });
    default:
      return state;
  }
};

export default getSlotsBasedOnSiteIdReducer;
