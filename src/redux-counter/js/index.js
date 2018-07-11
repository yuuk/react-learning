import '../css/index.less'

import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import { composeWithDevtools } from 'redux-devtools-extension'
import createSagaMiddleware from 'redux-saga'

import rootReducer from './reducers'
import App from './components/App'

import rootSaga from './sagas'

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    applyMiddleware(sagaMiddleware)
);


sagaMiddleware.run(rootSaga);


ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('root')
)