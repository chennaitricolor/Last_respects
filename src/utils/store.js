import { applyMiddleware, compose, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import reducers from '../reducers/index';

export const sagaMiddleware = createSagaMiddleware();

let store = createStore(reducers, compose(applyMiddleware(sagaMiddleware), window.devToolsExtension ? window.__REDUX_DEVTOOLS_EXTENSION__() : (f) => f));

export default store;
