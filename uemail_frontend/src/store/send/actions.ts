import { ActionCreator } from 'redux';
import {
  SendEmailState,
  SendEmailErrorsState,
  SendEmailMessageState,
  UpdateSendEmail,
  UpdateSendEmailErrors,
  UpdateSendEmailMessage,
  SendState,
  ResetSendState
} from './types';

export const updateSendEmail: ActionCreator<UpdateSendEmail> = (email: SendEmailState) => ({
  type: '@@send/UPDATE_SEND_EMAIL',
  payload: {
    email
  },
});

export const updateSendEmailErrors: ActionCreator<UpdateSendEmailErrors> = (errors: SendEmailErrorsState) => ({
  type: '@@send/UPDATE_SEND_EMAIL_ERRORS',
  payload: {
    errors
  }
});

export const updateSendEmailMessage: ActionCreator<UpdateSendEmailMessage> = (message: SendEmailMessageState) => ({
  type: '@@send/UPDATE_SEND_EMAIL_MESSAGE',
  payload: {
    message
  },
});

export const resetSendEmailState: ActionCreator<ResetSendState> = () => ({
  type: '@@send/RESET_SEND_STATE'
});
