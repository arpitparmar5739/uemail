import React from 'react';
import { NavLink } from 'react-router-dom';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

export default function () {
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
