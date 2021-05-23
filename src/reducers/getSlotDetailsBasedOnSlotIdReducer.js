import { actionTypes } from '../utils/actionTypes';

const defaultState = {
  isLoading: false,
  slotDetails: null,
  error: '',
};

const getSlotDetailsBasedOnSlotIdReducer = (state = defaultState, action) => {
  switch (action.type) {
    case actionTypes.GET_SLOT_DETAILS_BASED_SLOT_ID:
      return Object.assign({}, state, { isLoading: true });
    case actionTypes.GET_SLOT_DETAILS_BASED_SLOT_ID_SUCCESS:
      return Object.assign({}, state, { isLoading: false, slotDetails: action.response, error: '' });
    case actionTypes.GET_SLOT_DETAILS_BASED_SLOT_ID_FAILURE:
      return Object.assign({}, state, { isLoading: false, slotDetails: null, error: action.error });
    case actionTypes.CLEAR_DATA_ON_ZONE_SELECTION:
      return Object.assign({}, state, defaultState);
    case actionTypes.RESET_DATA_UNMOUNT_SLOT_BOOKING:
      return Object.assign({}, state, defaultState);
    default:
      return state;
  }
};

export default getSlotDetailsBasedOnSlotIdReducer;
