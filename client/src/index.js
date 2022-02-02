import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter as MainRouter } from 'react-router-dom';
import store from './store/store'
import { Provider } from 'react-redux'
import './index.css'

ReactDOM.render(
  <React.StrictMode>
    <MainRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </MainRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

