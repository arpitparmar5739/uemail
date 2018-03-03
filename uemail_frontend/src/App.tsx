import * as React from 'react';

import Header from './components/common/header/Header';
import Footer from './components/common/footer/Footer';
import Routes from './Routes';

class App extends React.Component {
  public render() {
    return (
      <div className="base">
        <Header/>
        <div className="container">
          <Routes/>
        </div>
        <Footer/>
      </div>
    );
  }
}

export default App;
