import { actionTypes } from '../utils/actionTypes';

const defaultState = {
  loginMessage: null,
};

const loginResponse = (state = defaultState, action) => {
  switch (action.type) {
    case actionTypes.LOGIN_SUCCESS:
      return Object.assign({}, state, { loginMessage: action.response });
    case actionTypes.LOGIN_FAILURE:
      return Object.assign({}, state, { loginMessage: action.response });
    case actionTypes.LOGOUT_SUCCESS:
      return Object.assign({}, state, { loginMessage: null });
    default:
      return state;
  }
};

export default loginResponse;
