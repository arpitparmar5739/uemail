import * as React from 'react';
import { Route } from 'react-router-dom';

import AboutPage from './components/about/AboutPage';
import HomePage from './components/home/HomePage';

class Routes extends React.Component {
  render() {
    return (
      <div>
        <Route path="/home" exact={true} component={HomePage}/>
        <Route path="/about" component={AboutPage}/>
      </div>
    );
  }
}

export default Routes;
