import React from 'react';
import { NavLink } from 'react-router-dom';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { checkAuthorizationState } from "../../utils/checkAuthorizationState";
import { store } from "../../index";
import setAuthorizationDetails from "../../utils/setAuthorizationDetails";
import { RouteComponentProps, withRouter } from "react-router";
import { updateLoginMessage } from "../../store/login/actions";

interface HeaderProps extends RouteComponentProps<{}> {
}

class Header extends React.Component<HeaderProps> {
  constructor(props: HeaderProps) {
    super(props);
    this.logout = this.logout.bind(this);
    this.loggedInHeader = this.loggedInHeader.bind(this);
  }

  logout() {
    localStorage.removeItem('authToken');
    setAuthorizationDetails(null);
    store.dispatch(updateLoginMessage({status: 'success', value: 'Logged Out Successfully!'}));
    this.props.history.push('/login');
  }

  header(): JSX.Element {
    return (
      <div>
        <header>
          <Navbar inverse collapseOnSelect fixedTop>
            <Navbar.Header>
              <Navbar.Brand>
                <NavLink to={'/'}>Uemail</NavLink>
              </Navbar.Brand>
              <Navbar.Toggle />
            </Navbar.Header>
            <Navbar.Collapse>
              <Nav pullRight={true}>
                <LinkContainer to={'/signup'}>
                  <NavItem>
                    Sign Up
                  </NavItem>
                </LinkContainer>
                <LinkContainer to={'/login'}>
                  <NavItem>
                    Login
                  </NavItem>
                </LinkContainer>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        </header>
      </div>
    );
  }

  loggedInHeader(): JSX.Element {
    return (
      <div>
        <header>
          <Navbar inverse collapseOnSelect fixedTop>
            <Navbar.Header>
              <Navbar.Brand>
                <NavLink to={'/'}>Uemail</NavLink>
              </Navbar.Brand>
              <Navbar.Toggle />
            </Navbar.Header>
            <Navbar.Collapse>
              <Nav pullRight={true}>
                <LinkContainer to={'/inbox'}>
                  <NavItem>
                    Inbox
                  </NavItem>
                </LinkContainer>
                <LinkContainer to={'/send'}>
                  <NavItem>
                    Send
                  </NavItem>
                </LinkContainer>
                <LinkContainer to={'/sent'}>
                  <NavItem>
                    Sent
                  </NavItem>
                </LinkContainer>
                <NavDropdown title={store.getState().auth.user!.email} id="nav-dropdown">
                  <MenuItem>Profile</MenuItem>
                  <MenuItem divider />
                  <MenuItem onClick={this.logout}>Log Out</MenuItem>
                </NavDropdown>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        </header>
      </div>
    );
  }

  render() {
    if (checkAuthorizationState()) {
      return (this.loggedInHeader());
    } else {
      return (this.header());
    }
  }
}

export default withRouter(Header);
