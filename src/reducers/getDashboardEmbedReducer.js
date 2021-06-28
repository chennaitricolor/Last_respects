import { actionTypes } from '../utils/actionTypes';

const defaultState = {
  dashboardEmbedUrl: undefined,
  dashboardEmbedUrlError: '',
  isLoading: false,
};

const getDashboardEmbedReducer = (state = defaultState, action) => {
  switch (action.type) {
    case actionTypes.GET_DASHBOARD_EMBED_URL:
      return Object.assign({}, state, { dashboardEmbedUrl: undefined, dashboardEmbedUrlError: '', isLoading: true });
    case actionTypes.GET_DASHBOARD_EMBED_URL_SUCCESS:
      return Object.assign({}, state, { dashboardEmbedUrl: action.response, dashboardEmbedUrlError: '', isLoading: false });
    case actionTypes.GET_DASHBOARD_EMBED_URL_FAILURE:
      return Object.assign({}, state, { dashboardEmbedUrl: undefined, dashboardEmbedUrlError: action.error, isLoading: false });
    default:
      return state;
  }
};

export default getDashboardEmbedReducer;
