import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './styles/main.css';

import Header from './components/shared/Header';
import Routes from './routes';

import { Store } from "redux";
import { Provider } from "react-redux";
import { ApplicationState } from './store';
import { initialLoginState } from "./store/login/reducer";
import { initialSignupState } from "./store/signup/reducer";
import { initialAuthState } from "./store/auth/reducer";
import configureStore from './configureStore';
import setAuthorizationDetails from "./utils/setAuthorizationDetails";
import { initialSendState } from "./store/send/reducer";

export function initialState(): ApplicationState {
  return ({
    login: initialLoginState(),
    signup: initialSignupState(),
    auth: initialAuthState(),
    send: initialSendState()
  });
}

export let store: Store<ApplicationState> = configureStore(initialState());
setAuthorizationDetails(localStorage.authToken);

ReactDOM.render(
  <Router>
    <Provider store={store}>
      <div>
        <Header />
        <Routes />
      </div>
    </Provider>
  </Router>,
  document.getElementById('root')
);
