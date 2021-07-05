import React, { useEffect } from 'react';
import { embedDashboard } from 'amazon-quicksight-embedding-sdk';
import { useDispatch, useSelector } from 'react-redux';
import { actionTypes } from '../utils/actionTypes';
import LoadingComponent from './LoadingComponent';
import Header from './Header';

const loadingComponentStyle = {
  top: '40%',
  position: 'absolute',
  left: '42%',
  color: '#0084FF',
  width: '50px',
};

let options = {
  container: '#dashboardContainer',
  parameters: {},
  scrolling: 'no',
  height: 'AutoFit',
  loadingHeight: '700px',
  locale: 'en-US',
  footerPaddingEnabled: true,
};

export const ReportEmbedComponent = () => {
  const dispatch = useDispatch();
  const getDashboardEmbedUrl = useSelector((state) => state.getDashboardEmbedReducer);

  useEffect(() => {
    dispatch({
      type: actionTypes.GET_DASHBOARD_EMBED_URL,
    });
  }, [dispatch]);

  useEffect(() => {
    if (getDashboardEmbedUrl !== undefined && getDashboardEmbedUrl.dashboardEmbedUrl !== undefined) {
      options.url = getDashboardEmbedUrl.dashboardEmbedUrl.dashboard.EmbedUrl;
      embedDashboard(options);
    }
  }, [getDashboardEmbedUrl]);

  const getElementsToRender = () => {
    const getDashboardEmbedUrlResponse = getDashboardEmbedUrl;
    if (getDashboardEmbedUrlResponse !== undefined && getDashboardEmbedUrlResponse.isLoading) {
      return <LoadingComponent isLoading={getDashboardEmbedUrlResponse.isLoading} style={loadingComponentStyle} />;
    } else {
      return (
        <div style={{ height: '100%', overflow: 'scroll' }}>
          <Header />
          <div id="dashboardContainer"></div>
        </div>
      );
    }
  };
  return getElementsToRender();
};

ReportEmbedComponent.propTypes = {};

export default ReportEmbedComponent;
