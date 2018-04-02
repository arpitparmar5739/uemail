import React, { FormEvent } from 'react';
import { connect } from "react-redux";
import { FormControl } from "react-bootstrap";
import { LoginState } from "../../store/login/types";
import LoginForm from '../../components/login/LoginForm';
import { ApplicationState, ConnectedReduxProps } from "../../store";
import { formValidationState } from "../../types";
import { updateLoginUser, updateLoginMessage, resetLoginState } from "../../store/login/actions";
import { isArray } from "util";
import axios from 'axios';

interface LoginProps extends ConnectedReduxProps<LoginState> {
}

type allProps = LoginProps & LoginState;

class LoginPage extends React.Component<allProps> {
  constructor(props: allProps) {
    super(props);

    this.submit = this.submit.bind(this);
    this.validateForm = this.validateForm.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.getValidationState = this.getValidationState.bind(this)
  }

  setMessageState(status: string, value: string) {
    const message = {
      status: status,
      value: value
    };
    this.props.dispatch(updateLoginMessage(message));
  }

  handleChange(e: FormEvent<FormControl>) {
    this.setMessageState('', '');
    let field = (e.target as HTMLInputElement).name;

    if (field === 'username') {
      this.props.user.username = (e.target as HTMLInputElement).value;
    } else if (field === 'password') {
      this.props.user.password = (e.target as HTMLInputElement).value;
    } else {
      throw new Error("Something went wrong!");
    }
    this.props.dispatch(updateLoginUser(this.props.user));
  }

  getValidationState(field: string): formValidationState {
    const value: string = this.props.user[field];

    if (value.length === 0) {
      return null;
    }

    if (value.length < 5 || value.length > 15) {
      this.props.errors[field] = `${field} should be min 5 and max 15 letters!`;
    } else if (!(/^[a-z0-9]+$/ig.test(value)) && field !== 'password') {
      this.props.errors[field] = `${field} should only contain letters and numbers!`;
    } else {
      this.props.errors[field] = '';
      return 'success';
    }
    return 'error';
  }

  validateForm(): boolean {
    for (let key of Object.keys(this.props.user)) {
      if (this.props.errors[key].length > 0 || this.props.user[key].length === 0) {
        return false;
      }
    }
    return true;
  }

  resetForm() {
    this.props.dispatch(resetLoginState());
  }

  submit() {
    if (this.validateForm()) {
      axios.post('http://localhost:3000/login', this.props.user)
        .then(() => {
          this.resetForm();
          this.setMessageState(
            'success',
            'Login is successful. Redirecting to the home page...'
          );
        })
        .catch((error) => {
          let err: string;
          if (error.response) {
            if (!!error.response.data.message && isArray(error.response.data.message)) {
              err = 'Error: ' + error.response.data.message.map((message: any) => {
                return message.msg;
              }).join(',');
            } else {
              err = error.response.data.message;
            }
            this.setMessageState('error', err);
          } else if (error.request) {
            // Todo: Handle this properly.
            err = 'Please check your internet connection and try again later!';
            this.setMessageState('error', err);
          } else {
            err = error.message;
            this.setMessageState('error', err);
          }
          clearTimeout();
          setTimeout(
            () => {
              this.setMessageState('error', '');
            },
            5000);
        });
    } else {
      this.setMessageState('error', 'Please fill the form correctly');
    }
  }

  render() {
    return (
      <div>
        <LoginForm
          login={this.props}
          handleChange={this.handleChange}
          submit={this.submit}
          getValidationState={this.getValidationState}
        />
      </div>
    );
  }
}

const mapStateToProps = (state: ApplicationState) => state.login;

export default connect(mapStateToProps)(LoginPage);
