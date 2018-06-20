// src/js/store/index.js
/* @flow */
import { createStore, applyMiddleware, compose } from 'redux'
import reducers from '../reducers/index'
import thunk from 'redux-thunk'
import createSagaMiddleware from 'redux-saga'
const sagaMiddleware = createSagaMiddleware()
import { createLogger} from 'redux-logger';
const logger = createLogger();

const initialState = {}

export default createStore(reducers,
    initialState,
    compose(applyMiddleware(thunk, sagaMiddleware, logger))
)