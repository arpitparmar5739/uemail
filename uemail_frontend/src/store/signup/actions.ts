import { ActionCreator } from 'redux';
import {
  SignupUserState,
  SignupErrorsState,
  SignupMessageState,
  UpdateSignupUser,
  UpdateSignupErrors,
  UpdateSignupMessage,
  ResetSignupState
} from './types';

export const updateSignupUser: ActionCreator<UpdateSignupUser> = (user: SignupUserState) => ({
  type: '@@signup/UPDATE_SIGNUP_USER',
  payload: {
    user
  },
});

export const updateSignupErrors: ActionCreator<UpdateSignupErrors> = (errors: SignupErrorsState) => ({
  type: '@@signup/UPDATE_SIGNUP_ERRORS',
  payload: {
    errors
  }
});

export const updateSignupMessage: ActionCreator<UpdateSignupMessage> = (message: SignupMessageState) => ({
  type: '@@signup/UPDATE_SIGNUP_MESSAGE',
  payload: {
    message
  },
});

export const resetSignupState: ActionCreator<ResetSignupState> = () => ({
  type: '@@signup/RESET_SIGNUP_STATE'
});
