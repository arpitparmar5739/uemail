import * as React from 'react';
import axios from 'axios';
import {FormEvent} from 'react';
import {FormControl} from 'react-bootstrap';

import SignupForm from './SignupForm';
import {type} from 'os';
import {isArray} from 'util';

interface SignupProps {
}

interface SignupState {
  user: {
    username: string,
    email: string,
    password: string,
    confirmPassword: string,
    firstname: string,
    lastname: string,
    phone: string
    [key: string]: string
  };
  errors: {
    username: string,
    email: string,
    password: string,
    confirmPassword: string,
    firstname: string,
    lastname: string,
    phone: string
    [key: string]: string
  };
  message: string;
}

class Signup extends React.Component<SignupProps, SignupState> {
  constructor(props: SignupProps) {
    super(props);

    this.submit = this.submit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.getValidationState = this.getValidationState.bind(this);

    this.state = {
      user: {
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        firstname: '',
        lastname: '',
        phone: ''
      },
      errors: {
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        firstname: '',
        lastname: '',
        phone: ''
      },
      message: ''
    };
  }

  handleChange(e: FormEvent<FormControl>) {
    let field: string = (e.target as HTMLInputElement).name;
    this.state.user[field] = (e.target as HTMLInputElement).value;
    this.setState({user: this.state.user});
  }

  submit() {
    axios.post('http://localhost:3000/signup', this.state.user)
      .then((response) => {
        /* tslint:disable */
        this.setState({
          message: response.data.message
        });
      })
      .catch((error) => {
        if (error.response) {
          if (!!error.response.data.message && isArray(error.response.data.message)) {
            let errors: any = {};
            for (let message of error.response.data.message) {
              errors[message.param] = message.msg;
            }
            this.setState({
              errors: errors
            });
          } else {
            this.setState({
              message: error.response.data.message
            });
          }
        } else if (error.request) {
          this.setState({
            message: error.request
          });
        } else {
          this.setState({
            message: error.message
          });
        }
      });
  }

  getValidationState() {
    const length = this.state.user.username.length;
    if (length > 4) {
      return 'success';
    } else if (length > 5) {
      return 'warning';
    } else if (length > 0) {
      return 'error';
    }
    return null;
  }

  public render() {
    return (
      <div>
        <SignupForm
          user={this.state.user}
          errors={this.state.errors}
          message={this.state.message}
          onChange={this.handleChange}
          onSubmit={this.submit}
          getValidationState={this.getValidationState}
        />
      </div>
    );
  }
}

export default Signup;
