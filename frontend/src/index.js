import React from 'react';
import ReactDOM from 'react-dom';
import App from './App/App.js';
import { createStore } from 'redux';
import allReducer from './reducers';
import { Provider } from 'react-redux';

const Store = createStore(
  allReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

//Store.subscribe(() => console.log(store.getState()));

//Store.dispatch(ChangeToCompany());

ReactDOM.render(
  <Provider store={Store}>
    <App />
  </Provider>,
  document.querySelector('#root')
);
