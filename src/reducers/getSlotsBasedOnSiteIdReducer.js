import { actionTypes } from '../utils/actionTypes';

const defaultState = {
  isLoading: false,
  slotList: [],
  slotDetails: null,
  error: '',
};

const getSlotsBasedOnSiteIdReducer = (state = defaultState, action) => {
  switch (action.type) {
    case actionTypes.GET_SLOTS_BASED_SITE_ID:
      return Object.assign({}, state, { isLoading: true });
    case actionTypes.GET_SLOTS_BASED_SITE_ID_SUCCESS:
      return Object.assign({}, state, { isLoading: false, slotDetails: action.response, error: '' });
    case actionTypes.GET_SLOTS_BASED_SITE_ID_FAILURE:
      return Object.assign({}, state, { isLoading: false, slotDetails: null, error: action.error });
    default:
      return state;
  }
};

export default getSlotsBasedOnSiteIdReducer;
