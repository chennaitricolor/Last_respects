import { actionTypes } from '../utils/actionTypes';

const defaultState = {
  openSnack: false,
  message: '',
  severity: 'success',
};

const showSnackBarMessageReducer = (state = defaultState, action) => {
  switch (action.type) {
    case actionTypes.SHOW_SNACKBAR:
      return Object.assign({}, state, { openSnack: action.payload.openSnack, message: action.payload.message, severity: action.payload.severity });
    case actionTypes.RESET_SNACKBAR:
      return Object.assign({}, state, { openSnack: false, message: '', severity: 'success' });
    case actionTypes.LOGOUT_SUCCESS:
      return Object.assign({}, state, defaultState);
    default:
      return state;
  }
};

export default showSnackBarMessageReducer;
