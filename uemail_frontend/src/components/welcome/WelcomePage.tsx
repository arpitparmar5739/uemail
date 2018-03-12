import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Col, SelectCallback, Tab, Tabs, Thumbnail } from 'react-bootstrap';

import Login from '../common/login/Login';
import Signup from '../common/signup/Signup';

import './WelcomePage.css';

interface WelcomePageProps extends RouteComponentProps<{}> {
}

interface WelcomePageState {
  key: string;
}

class WelcomePage extends React.Component<WelcomePageProps, WelcomePageState> {
  constructor(props: WelcomePageProps) {
    super(props);
    this.handleSelect = this.handleSelect.bind(this);

    if (this.props.location.pathname === '/login') {
      this.state = {key: 'login'};
    } else if (this.props.location.pathname === '/signup'
      || this.props.location.pathname === '/') {
      this.state = {key: 'signup'};
    }
  }

  handleSelect(key: string) {
    this.props.history.push(key);
    this.setState({key});
  }

  public render() {
    return (
      <div>
        <Col md={6} sm={12} mdOffset={3}>
          <Thumbnail>
            <Tabs
              activeKey={this.state.key}
              onSelect={this.handleSelect as SelectCallback}
              id="login_signup"
            >
              <Tab eventKey={'signup'} title="Sign Up">
                <br/>
                <Signup/>
              </Tab>
              <Tab eventKey={'login'} title="Login">
                <br/>
                <Login/>
              </Tab>
            </Tabs>
          </Thumbnail>
        </Col>
      </div>
    );
  }
}

export default WelcomePage;
