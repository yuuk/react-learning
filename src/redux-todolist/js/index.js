import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import todoApp from './reducers'
import App from './components/App'

import 'babel-polyfill';
require('es6-promise').polyfill();
require('isomorphic-fetch');

let store = createStore(
    todoApp,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()

);

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('root')
)



function* fibonacci() {
    let [prev, curr] = [0, 1];
    for (;;) { // 这里请思考：为什么这个循环不设定结束条件？
      [prev, curr] = [curr, prev + curr];
      yield curr;
    }
  }
  
  for (let n of fibonacci()) {
    if (n > 1000) {
      break;
    }
    console.log(n);
  }
