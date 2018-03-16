import * as React from 'react';
import {Route} from 'react-router-dom';

import WelcomePage from './components/welcome/WelcomePage';
import AboutPage from './components/about/AboutPage';
import HomePage from './components/home/HomePage';
import ContactPage from './components/contact/ContactPage';

class Routes extends React.Component {
  public render() {
    return (
      <div>
        <Route path="/(|login|signup)/" exact={true} component={WelcomePage}/>
        <Route path="/home" exact={true} component={HomePage}/>
        <Route path="/about" exact={true} component={AboutPage}/>
        <Route path="/contact" component={ContactPage}/>
      </div>
    );
  }
}

export default Routes;
