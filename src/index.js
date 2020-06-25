/*!

=========================================================
* Argon Dashboard React - v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Switch, Redirect, HashRouter } from "react-router-dom";

import "assets/plugins/nucleo/css/nucleo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/scss/argon-dashboard-react.scss";

import AdminLayout from "layouts/Admin.js";
import AuthLayout from "layouts/Auth.js";

//redux
import { createStore } from 'redux';
import journalReducer from 'lib/redux/reducers/journal.js';
import { Provider } from 'react-redux';

const initialState = {
  fetchedInitial: false,
  entries: [],
};

const store = createStore(
    journalReducer,
    initialState,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );

ReactDOM.render(
  <Provider store={store}>
    <HashRouter>
      <Switch>
        <Route path="/auth" render={props => <AuthLayout {...props} />} />
        <Route path="/admin" render={props => <AdminLayout {...props}/>} />
        <Redirect from="/" to='/auth/login'/>
      </Switch>
    </HashRouter>
  </Provider>,
  document.getElementById('root')
);
