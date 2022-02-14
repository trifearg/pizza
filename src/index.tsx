import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './layouts/app';
import reportWebVitals from './reportWebVitals';
import { store } from './store';
import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
