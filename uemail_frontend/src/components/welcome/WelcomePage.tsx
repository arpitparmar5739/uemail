import React from 'react';
import { NavLink } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { RouteComponentProps } from 'react-router';
import { checkAuthorizationState } from '../../utils/checkAuthorizationState';

interface WelcomePageProps extends RouteComponentProps<{}> {
}

const WelcomePage: React.SFC<WelcomePageProps> = (props: WelcomePageProps) => {
  if (checkAuthorizationState()) {
    props.history.push('/inbox');
  }

  return (
    <div className={'jumbotron text-center'}>
      <h1>Welcome to Uemail</h1>
      <hr/>
      <div>
        <NavLink to={'/signup'}>
          <Button bsStyle={'primary'}>Sign Up</Button>
        </NavLink>

        <NavLink to={'/login'} className={'col-xs-offset-1'}>
          <Button bsStyle={'primary'}>Login</Button>
        </NavLink>
      </div>
    </div>
  );
};

export default WelcomePage;
