import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './styles/main.css';
import './styles/fontawesome/fontawesome-all.min.css';

import Header from './components/shared/Header';
import Routes from './routes';

import { Store } from "redux";
import { Provider } from "react-redux";
import { ApplicationState } from './store';
import configureStore from './configureStore';
import setAuthorizationDetails from "./utils/setAuthorizationDetails";
import { initialLoginState } from "./store/login/reducer";
import { initialSignupState } from "./store/signup/reducer";
import { initialAuthState } from "./store/auth/reducer";
import { initialSendState } from "./store/send/reducer";
import { initialInboxState } from "./store/inbox/reducer";
import { initialViewEmailState } from "./store/view_email/reducer";
import { initialSentState } from "./store/sent/reducer";

export function initialState(): ApplicationState {
  return ({
    login: initialLoginState(),
    signup: initialSignupState(),
    auth: initialAuthState(),
    send: initialSendState(),
    inbox: initialInboxState(),
    sent: initialSentState(),
    view_email: initialViewEmailState()
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
