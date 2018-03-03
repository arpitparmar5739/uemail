import * as React from 'react';
import { Link } from 'react-router-dom';

class Header extends React.Component {
  public render() {
    return (
      <div>
        <header><p>React Router v4 Browser Example</p>
          <nav>
            <ul>
              <li><Link to="/home">Home</Link></li>
              <li><Link to="/about">About</Link></li>
            </ul>
          </nav>
        </header>
      </div>
    );
  }
}

export default Header;
