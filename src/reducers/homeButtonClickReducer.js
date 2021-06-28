import { actionTypes } from '../utils/actionTypes';

const defaultState = {
  homeButtonClicked: false,
  error: '',
};

const homeButtonClickReducer = (state = defaultState, action) => {
  switch (action.type) {
    case actionTypes.HOME_BUTTON_CLICKED:
      return Object.assign({}, state, { homeButtonClicked: action.payload.homeButtonClicked });
    default:
      return state;
  }
};

export default homeButtonClickReducer;
