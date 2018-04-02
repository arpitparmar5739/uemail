import { Action } from "redux";

// Login State Types
export interface LoginState {
  user: LoginUserState;
  errors: LoginErrorsState;
  message: LoginMessageState;
}

export interface LoginUserState extends LoginUser {
}

export interface LoginErrorsState extends LoginUser {
}

export interface LoginUser {
  username: string;
  password: string;

  [key: string]: string;
}

export interface LoginMessageState {
  status: string,
  value: string
}

// Login Action Types
export interface UpdateLoginUser extends Action {
  type: '@@login/UPDATE_LOGIN_USER';
  payload: {
    user: LoginUserState;
  };
}

export interface UpdateLoginErrors extends Action {
  type: '@@login/UPDATE_LOGIN_ERRORS';
  payload: {
    errors: LoginErrorsState;
  }
}

export interface UpdateLoginMessage extends Action {
  type: '@@login/UPDATE_LOGIN_MESSAGE';
  payload: {
    message: LoginMessageState;
  }
}

export interface ResetLoginState extends Action {
  type: '@@login/RESET_LOGIN_STATE'
}

export type LoginActions = (
  UpdateLoginUser | UpdateLoginErrors |
  UpdateLoginMessage | ResetLoginState
  );
