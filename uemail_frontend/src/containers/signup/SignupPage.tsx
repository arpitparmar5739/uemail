import axios from 'axios';
import { isArray } from "util";
import { connect } from "react-redux";
import React, { FormEvent } from 'react';
import { FormControl } from "react-bootstrap";
import { formValidationState } from "../../types";
import { SignupState } from "../../store/signup/types";
import SignupForm from '../../components/signup/SingupForm';
import { ApplicationState, ConnectedReduxProps } from "../../store";
import { resetSignupState, updateSignupMessage, updateSignupUser } from "../../store/signup/actions";
import { checkAuthorizationState } from "../../utils/checkAuthorizationState";
import { RouteComponentProps } from "react-router";

interface SignupProps extends ConnectedReduxProps<SignupState>, RouteComponentProps<{}> {
}

type allProps = SignupProps & SignupState;

class SignupPage extends React.Component<allProps> {
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
    this.props.dispatch(updateSignupMessage(message));
  }

  handleChange(e: FormEvent<FormControl>) {
    this.setMessageState('', '');
    let field: string = (e.target as HTMLInputElement).name;
    this.props.user[field] = (e.target as HTMLInputElement).value;
    this.props.dispatch(updateSignupUser(this.props.user));
  }

  getValidationState(field: string): formValidationState {
    const value: string = this.props.user[field];

    if (value.length === 0) {
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
          this.props.errors[field] = `${field} should be min 5 and max 15 letters!`;
        } else if ((field === 'firstname' || field === 'lastname') &&
          (value.length < 1 || value.length > 30)) {
          this.props.errors[field] = `${field} should be min 1 and max 15 letters!`;
        } else if (!(/^[a-z0-9]+$/ig.test(value)) && field !== 'password') {
          this.props.errors[field] = `${field} should only contain letters and numbers!`;
        } else {
          this.props.errors[field] = '';
          return 'success';
        }
        return 'error';

      case 'email':
        if (!(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/).test(value)) {
          this.props.errors[field] = `Invalid ${field}!`;
        } else {
          this.props.errors[field] = '';
          return 'success';
        }
        return 'error';

      case 'confirmPassword':
        if (value !== this.props.user.password) {
          this.props.errors[field] = 'Passwords does not match!';
        } else {
          this.props.errors[field] = '';
          return 'success';
        }
        return 'error';

      case 'phone':
        try {
          if (this.props.user.phone.length === 10 && parseInt(this.props.user.phone, 10)) {
            this.props.errors.phone = '';
            return 'success';
          }
          this.props.errors.phone = 'Invalid Phone Number!';
        } catch (e) {
          this.props.errors.phone = 'Invalid Phone Number!';
        }
        return 'error';

      default:
        return null;
    }
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
    this.props.dispatch(resetSignupState());
  }

  // Todo: Handle this properly.
  submit() {
    if (this.validateForm()) {
      axios.post('http://localhost:3000/signup', this.props.user)
        .then((data) => {
          console.log(data);
          const username: string = this.props.user.username;
          this.resetForm();
          this.setMessageState(
            'success',
            'Signup is successful you can now login with' + ' username: ' + username
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
      console.log("o.O");
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
        <SignupForm
          signup={this.props}
          handleChange={this.handleChange}
          submit={this.submit}
          getValidationState={this.getValidationState}
        />
      </div>
    );
  }
}

const mapStateToProps = (state: ApplicationState) => state.signup;

export default connect(mapStateToProps)(SignupPage);
