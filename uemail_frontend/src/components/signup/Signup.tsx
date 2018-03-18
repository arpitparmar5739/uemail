import * as React from 'react';
import axios from 'axios';
import {FormEvent} from 'react';
import {FormControl} from 'react-bootstrap';

import SignupForm from './SignupForm';
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
    phone: string,
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
  message: {
    error: string,
    success: string
  };
}

class Signup extends React.Component<SignupProps, SignupState> {
  submitFlag: boolean = true;
  initialState: SignupState = {
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
    message: {
      error: '',
      success: ''
    }
  };

  constructor(props: SignupProps) {
    super(props);

    this.submit = this.submit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.getValidationState = this.getValidationState.bind(this);

    this.state = this.initialState;
  }

  handleChange(e: FormEvent<FormControl>) {
    let field: string = (e.target as HTMLInputElement).name;
    this.state.user[field] = (e.target as HTMLInputElement).value;
    this.setState({user: this.state.user});
  }

  resetForm() {
    this.submitFlag = true;
    for (let key of Object.keys(this.state.user)) {
      this.state.user[key] = '';
    }
    this.state.message.error = '';
    this.state.message.success = '';
    this.setState({
      user: this.initialState.user,
      errors: this.initialState.errors,
      message: this.initialState.message
    });
  }

  submit() {
    this.submitFlag = false;
    for (let key of Object.keys(this.state.user)) {
      if (this.state.errors[key].length > 0 || this.state.user[key].length === 0) {
        this.state.message.error = 'Please fill the form correctly!';
        this.setState({message: this.state.message});
        return;
      }
    }

    axios.post('http://localhost:3000/signup', this.state.user)
      .then(() => {
        let username = this.state.user.username;
        this.resetForm();
        this.state.message.success = (
          'Signup is successful you can now login with ' + username + ' username!'
        );
        this.setState({message: this.state.message});
      })
      .catch((error) => {
        if (error.response) {
          if (!!error.response.data.message && isArray(error.response.data.message)) {
            this.state.message.error = 'Error: ' + error.response.data.message.map((message) => {
              return message.msg;
            }).join(',');
            this.setState({message: this.state.message});
          } else {
            this.state.message.error = error.response.data.message;
            this.setState({message: this.state.message});
          }
        } else if (error.request) {
          this.state.message.error = error.request;
          this.setState({message: this.state.message});
        } else {
          this.state.message.error = error.message;
          this.setState({message: this.state.message});
        }
      });
  }

  getValidationState(field: string) {
    const value: string = this.state.user[field];

    if (this.submitFlag) {
      return null;
    }

    switch (field) {
      case 'username':
      case 'firstname':
      case 'lastname':
      case 'password':
        if (field !== 'firstname'
          && field !== 'lastname'
          && (value.length < 5 || value.length > 15)) {
          this.state.errors[field] = `${field} should be min 5 and max 15 letters!`;
        } else if ((field === 'firstname' || field === 'lastname') &&
          (value.length < 1 || value.length > 30)) {
          this.state.errors[field] = `${field} should be min 1 and max 15 letters!`;
        } else if (!(/^[a-z0-9]+$/ig.test(value)) && field !== 'password') {
          this.state.errors[field] = `${field} should only contain letters and numbers!`;
        } else {
          this.state.errors[field] = '';
          return 'success';
        }
        return 'error';

      case 'email':
        if (!(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/).test(value)) {
          this.state.errors[field] = `Invalid ${field}!`;
        } else {
          this.state.errors[field] = '';
          return 'success';
        }
        return 'error';

      case 'confirmPassword':
        if (value !== this.state.user.password) {
          this.state.errors[field] = 'Passwords does not match!';
        } else {
          this.state.errors[field] = '';
          return 'success';
        }
        return 'error';

      case 'phone':
        try {
          if (this.state.user.phone.length === 10 && parseInt(this.state.user.phone, 10)) {
            this.state.errors.phone = '';
            return 'success';
          }
          this.state.errors.phone = 'Invalid Phone Number!';
        } catch (e) {
          this.state.errors.phone = 'Invalid Phone Number!';
        }
        return 'error';

      default:
        return null;
    }
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
