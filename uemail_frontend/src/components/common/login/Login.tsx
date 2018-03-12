import * as React from 'react';
import { FormControl, FormGroup } from 'react-bootstrap';
import { FormEvent } from 'react';

interface LoginProps {}

interface LoginState {
  username: string;
  password: string;
}

class Login extends React.Component<LoginProps, LoginState> {
  constructor(props: LoginProps) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      username: '',
      password: ''
    };
  }

  getValidationState() {
    const length = this.state.username.length;
    if (length > 10) {
      return 'success';
    } else if (length > 5) {
      return 'warning';
    } else if (length > 0) {
      return 'error';
    }
    return null;
  }

  handleChange(e: FormEvent<FormControl>): void {
    /* tslint:disable */
    if ((e.target as HTMLInputElement).name === 'username') {
      this.setState({
        username: (e.target as HTMLInputElement).value
      });
    } else if((e.target as HTMLInputElement).name === 'password') {
      this.setState({
        password: (e.target as HTMLInputElement).value
      });
    } else {
      // TODO: Do something here!
    }

  }

  public render() {
    return (
      <div>
        <form>
          <FormGroup controlId="username" validationState={this.getValidationState()}>
            <FormControl
              name="username"
              type="text"
              value={this.state.username}
              placeholder="Username"
              onChange={this.handleChange}
            />
          </FormGroup>

          <FormGroup controlId="password" validationState={this.getValidationState()}>
            <FormControl
              name="password"
              type="password"
              value={this.state.password}
              placeholder="Password"
              onChange={this.handleChange}
            />
          </FormGroup>
        </form>
      </div>
    );
  }
}

export default Login;
