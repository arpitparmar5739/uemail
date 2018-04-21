import { ActionCreator } from 'redux';
import {
  LoginUserState,
  LoginErrorsState,
  LoginMessageState,
  UpdateLoginUser,
  UpdateLoginErrors,
  UpdateLoginMessage, LoginState, ResetLoginState
} from './types';

export const updateLoginUser: ActionCreator<UpdateLoginUser> = (user: LoginUserState) => ({
  type: '@@login/UPDATE_LOGIN_USER',
  payload: {
    user
  }
});

export const updateLoginErrors: ActionCreator<UpdateLoginErrors> = (errors: LoginErrorsState) => ({
  type: '@@login/UPDATE_LOGIN_ERRORS',
  payload: {
    errors
  }
});

export const updateLoginMessage: ActionCreator<UpdateLoginMessage> = (message: LoginMessageState) => ({
  type: '@@login/UPDATE_LOGIN_MESSAGE',
  payload: {
    message
  }
});

export const resetLoginState: ActionCreator<ResetLoginState> = () => ({
  type: '@@login/RESET_LOGIN_STATE'
});
