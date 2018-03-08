import * as React from 'react';
import { Route } from 'react-router-dom';

import WelcomePage from './components/welcome/WelcomePage';
import AboutPage from './components/about/AboutPage';
import HomePage from './components/home/HomePage';

class Routes extends React.Component {
  public render() {
    return (
      <div>
        <Route path="/" exact={true} component={WelcomePage}/>
        <Route path="/home" exact={true} component={HomePage}/>
        <Route path="/about" component={AboutPage}/>
      </div>
    );
  }
}

export default Routes;
