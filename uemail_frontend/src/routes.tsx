import React from 'react';
import { Route } from 'react-router-dom';

import WelcomePage from './components/welcome/WelcomePage';
import SignupPage from './containers/signup/SignupPage';
import LoginPage from './containers/login/LoginPage';

const Routes = () => (
  <div>
    <Route exact path="/" component={WelcomePage} />
    <Route path="/signup" component={SignupPage} />
    <Route path="/login" component={LoginPage} />
  </div>
);

export default Routes;
