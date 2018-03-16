import * as React from 'react';
import {Navbar, Nav, NavItem, NavDropdown, MenuItem} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import {LinkContainer, IndexLinkContainer} from 'react-router-bootstrap';

import './Header.css';

interface HeaderProps {
}

interface HeaderState {
}

class Header extends React.Component {
  constructor(props: {}) {
    super(props);
  }

  public render() {
    return (
      <div>
        <header>
          <Navbar inverse={true} fixedTop={true}>
            <Navbar.Header>
              <Navbar.Brand>
                <Link to={'/'}>Uemail</Link>
              </Navbar.Brand>
            </Navbar.Header>
            <Nav pullRight={true}>
              <LinkContainer to={'/about'}>
                <NavItem>
                  About
                </NavItem>
              </LinkContainer>
              <LinkContainer to={'/contact'}>
                <NavItem>
                  Contact
                </NavItem>
              </LinkContainer>
              <NavDropdown eventKey={3} title="Hello" id="basic-nav-dropdown">
                <IndexLinkContainer to={'/'}>
                  <MenuItem>Home</MenuItem>
                </IndexLinkContainer>
                <LinkContainer to={'/about'}>
                  <MenuItem>About</MenuItem>
                </LinkContainer>
                <MenuItem divider={true}/>
                <LinkContainer to={'/contact'}>
                  <MenuItem>Contact</MenuItem>
                </LinkContainer>
              </NavDropdown>
            </Nav>
          </Navbar>
        </header>
      </div>
    );
  }
}

export default Header;
