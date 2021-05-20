import React, { lazy, Suspense } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import CssBaseline from '@material-ui/core/CssBaseline';
import store, { sagaMiddleware } from './utils/store';
import saga from './sagas/saga';
import './index.css';
import Routes from './routes/Routes';

sagaMiddleware.run(saga);

ReactDOM.render(
  <Provider store={store}>
    <CssBaseline />
    <Routes />
  </Provider>,
  document.getElementById('root'),
);
