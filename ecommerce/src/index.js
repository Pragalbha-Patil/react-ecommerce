import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter as Router} from "react-router-dom";

import {ProductProvider} from './Context';
// import { Provider } from 'react-redux'
// import store from './redux/store'
// import { fetchShirts } from './redux/action'

// store.dispatch(fetchShirts())

ReactDOM.render(
  <ProductProvider>
    <Router>
        {/* <Provider store={ store }> */}
          <App />
        {/* </Provider> */}
      </Router>
  </ProductProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
