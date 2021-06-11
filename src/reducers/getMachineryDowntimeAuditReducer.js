import { actionTypes } from '../utils/actionTypes';

const defaultState = {
  isLoading: false,
  error: '',
};

const getMachineryDowntimeAuditReducer = (state = defaultState, action) => {
  switch (action.type) {
    case actionTypes.GET_DOWNTIME_AUDIT:
      return Object.assign({}, state, { isLoading: true });
    case actionTypes.GET_DOWNTIME_AUDIT_SUCCESS:
      return Object.assign({}, state, { isLoading: false, auditList: action.response });
    case actionTypes.GET_DOWNTIME_AUDIT_FAILURE:
      return Object.assign({}, state, { isLoading: false });
    case actionTypes.LOGOUT_SUCCESS:
      return Object.assign({}, state, defaultState);
    default:
      return state;
  }
};

export default getMachineryDowntimeAuditReducer;
