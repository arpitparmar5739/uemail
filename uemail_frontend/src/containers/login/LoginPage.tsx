import React, { FormEvent } from 'react';
import { connect } from 'react-redux';
import { FormControl } from 'react-bootstrap';
import { LoginState } from '../../store/login/types';
import LoginForm from '../../components/login/LoginForm';
import { ApplicationState, ConnectedReduxProps } from '../../store';
import { formValidationState } from '../../types';
import { updateLoginUser, updateLoginMessage, resetLoginState } from '../../store/login/actions';
import { isArray } from 'util';
import axios, { AxiosResponse } from 'axios';
import { RouteComponentProps } from 'react-router';
import { checkAuthorizationState } from '../../utils/checkAuthorizationState';
import setAuthorizationDetails from '../../utils/setAuthorizationDetails';
import { BASE_URL } from '../../index';

interface LoginProps extends ConnectedReduxProps<LoginState>, RouteComponentProps<{}> {
}

type allProps = LoginProps & LoginState;

class LoginPage extends React.Component<allProps> {
  constructor(props: allProps) {
    super(props);

    this.submit = this.submit.bind(this);
    this.validateForm = this.validateForm.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.getValidationState = this.getValidationState.bind(this);
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
    this.props.user[field] = (e.target as HTMLInputElement).value;
    // TODO: Why this line below doest not work find that out!
    // this.props.dispatch(updateLoginUser(this.props.user));
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
      this.setMessageState(
        'success',
        'Please wait logging in...'
      );
      axios.post(`${BASE_URL}login`, this.props.user)
        .then((res: AxiosResponse<{ user: Object, message: { token: string } }>) => {
          const token: string = res.data.message.token;
          this.resetForm();
          localStorage.setItem('authToken', token);
          setAuthorizationDetails(token);
          this.props.history.push('/inbox');
          this.setMessageState(
            'success',
            'Login is successful. Redirecting to the inbox page...'
          );
          setTimeout(this.setMessageState('', ''), 3000);
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

  componentWillMount() {
    if (checkAuthorizationState()) {
      this.props.history.push('/inbox');
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

const mapStateToProps = (state: ApplicationState) => (state.login);

export default connect(mapStateToProps)(LoginPage);
