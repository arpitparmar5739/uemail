import { Action } from "redux";

// Send State Types
export interface SendState {
  email: SendEmailState;
  errors: SendEmailErrorsState;
  message: SendEmailMessageState;
}

export interface SendEmailState extends Email {
}

export interface SendEmailErrorsState extends Email {
}

export interface Email {
  to: string;
  cc: string;
  bcc: string;
  subject: string;
  body: string;

  [key: string]: string;
}

export interface SendEmailMessageState {
  status: string,
  value: string
}

// Send Action Types
export interface UpdateSendEmail extends Action {
  type: '@@send/UPDATE_SEND_EMAIL';
  payload: {
    email: SendEmailState;
  };
}

export interface UpdateSendEmailErrors extends Action {
  type: '@@send/UPDATE_SEND_EMAIL_ERRORS';
  payload: {
    errors: SendEmailErrorsState;
  }
}

export interface UpdateSendEmailMessage extends Action {
  type: '@@send/UPDATE_SEND_EMAIL_MESSAGE';
  payload: {
    message: SendEmailMessageState;
  }
}

export interface ResetSendState extends Action {
  type: '@@send/RESET_SEND_STATE'
}

export type SendEmailActions = (
  UpdateSendEmail | UpdateSendEmailErrors |
  UpdateSendEmailMessage | ResetSendState
  );
