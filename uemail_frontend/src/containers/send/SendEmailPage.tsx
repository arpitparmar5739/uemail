import React, { FormEvent } from 'react';
import { connect } from "react-redux";
import { FormControl } from "react-bootstrap";
import { LoginState } from "../../store/login/types";
import SendEmailPageComponent from '../../components/send/SendEmailPage';
import { ApplicationState, ConnectedReduxProps } from "../../store";
import { formValidationState } from "../../types";
import { isArray } from "util";
import axios, { AxiosResponse } from 'axios';
import { RouteComponentProps } from "react-router";
import { checkAuthorizationState } from "../../utils/checkAuthorizationState";
import { SendState } from "../../store/send/types";
import { resetSendEmailState, updateSendEmailMessage } from "../../store/send/actions";

interface SendEmailProps extends ConnectedReduxProps<LoginState>, RouteComponentProps<{}> {
}

type allProps = SendEmailProps & SendState;

class SendEmailPage extends React.Component<allProps> {
  constructor(props: allProps) {
    super(props);

    this.submit = this.submit.bind(this);
    this.validateForm = this.validateForm.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.getValidationState = this.getValidationState.bind(this)
  }

  static validateEmailId(email_id: string): boolean {
    return (/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/).test(email_id);
  }

  setMessageState(status: string, value: string, clearTime?: number) {
    const message = {
      status: status,
      value: value
    };
    this.props.dispatch(updateSendEmailMessage(message));
    if (clearTime) {
      clearTimeout();
      setTimeout(
        () => {
          this.setMessageState('error', '');
        },
        clearTime);
    }
  }

  handleChange(e: FormEvent<FormControl>) {
    this.setMessageState('', '');
    let field = (e.target as HTMLInputElement).name;
    this.props.email[field] = (e.target as HTMLInputElement).value;
  }

  getValidationState(field: string): formValidationState {
    const value: string = this.props.email[field];

    if (value.length === 0) {
      this.props.errors[field] = '';
      return null;
    }

    switch (field) {
      case 'to':
      case 'cc':
      case 'bcc':
        for (const email of (this.props.email[field]).replace(/\s/g, '').split(",")) {
          if (!SendEmailPage.validateEmailId(email)) {
            this.props.errors[field] = `${email} is not a valid email.`;
            return 'error';
          } else {
            this.props.errors[field] = '';
          }
        }
        return 'success';
      case 'subject':
        if (this.props.email.subject.length > 151) {
          this.props.errors.subject = 'Subject should be at-most 150 characters.';
          return 'error';
        }
        this.props.errors.subject = '';
        return 'success';
      case 'body':
        if (this.props.email.body.length > 5001) {
          this.props.errors.body = 'Body should be at-most 5000 characters.';
          return 'error';
        }
        this.props.errors.body = '';
        return 'success';
    }
    return 'success';
  }

  validateForm(): boolean {
    for (let key of Object.keys(this.props.email)) {
      if (this.props.errors[key].length > 0) {
        return false;
      }
    }

    return !(
      this.props.email['to'].length === 0 ||
      (this.props.email['subject'].length === 0 && this.props.email['body'].length === 0)
    );
  }

  resetForm() {
    this.props.dispatch(resetSendEmailState());
  }

  submit() {
    if (this.validateForm()) {
      axios.post('http://localhost:3000/email/send', this.props.email)
        .then((res: AxiosResponse<{ status: string, message: string }>) => {
          this.resetForm();
          this.setMessageState('success', res.data.message);
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
            // Todo: Handle this properly!
            err = 'Please check your internet connection and try again later!';
            this.setMessageState('error', err, 5000);
          } else {
            err = error.message;
            this.setMessageState('error', err, 5000);
          }
        });
    } else {
      if (this.props.email['subject'].length === 0 && this.props.email['body'].length === 0) {
        this.setMessageState('error', 'Can not send empty email.');
      } else {
        this.setMessageState('error', 'Please compose email properly.');
      }
    }
  }

  componentWillMount() {
    if (!checkAuthorizationState()) {
      this.props.history.push('/login');
    }
  }

  render() {
    return (
      <div>
        <SendEmailPageComponent
          send={this.props}
          handleChange={this.handleChange}
          submit={this.submit}
          getValidationState={this.getValidationState}
        />
      </div>
    );
  }
}

const mapStateToProps = (state: ApplicationState) => (state.send);

export default connect(mapStateToProps)(SendEmailPage);
