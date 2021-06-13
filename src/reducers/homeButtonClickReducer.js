import { actionTypes } from '../utils/actionTypes';

const defaultState = {
  homeButtonClicked: false,
  error: '',
};

const homeButtonClickReducer = (state = defaultState, action) => {
  switch (action.type) {
    case actionTypes.HOME_BUTTON_CLICKED:
      return Object.assign({}, state, { homeButtonClicked: action.payload.homeButtonClicked });
    // case actionTypes.RESET_DATA_UNMOUNT_SLOT_BOOKING:
    //   return Object.assign({}, state, { homeButtonClicked: false });
    default:
      return state;
  }
};

export default homeButtonClickReducer;
