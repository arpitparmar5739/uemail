import React from 'react';
import { Route } from 'react-router-dom';

import WelcomePage from './components/welcome/WelcomePage';
import SignupPage from './containers/signup/SignupPage';
import LoginPage from './containers/login/LoginPage';
import InboxPage from './containers/inbox/InboxPage';
import SendEmailPage from "./containers/send/SendEmailPage";
import ViewEmail from "./containers/view_email/ViewEmail";
import SentPage from "./containers/sent/SentPage";

const Routes = () => (
  <div>
    <Route exact path="/" component={WelcomePage} />
    <Route path="/signup" component={SignupPage} />
    <Route path="/login" component={LoginPage} />
    <Route path="/inbox" exact={true} component={InboxPage} />
    <Route path="/inbox/:email_id" component={ViewEmail} />
    <Route path="/sent" exact={true} component={SentPage} />
    <Route path="/sent/:email_id" component={ViewEmail} />
    <Route path="/send" component={SendEmailPage} />
  </div>
);

export default Routes;
