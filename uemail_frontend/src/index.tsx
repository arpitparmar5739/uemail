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
import configureStore from './configureStore';

const initialState: ApplicationState = {
  login: initialLoginState
};

let store: Store<ApplicationState> = configureStore(initialState);

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <div>
        <Header />
        <Routes />
      </div>
    </Router>
  </Provider>,
  document.getElementById('root')
);
