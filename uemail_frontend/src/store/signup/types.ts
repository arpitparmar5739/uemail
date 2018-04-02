import { Action } from "redux";

// Signup State Types
export interface SignupState {
  user: SignupUserState;
  errors: SignupErrorsState;
  message: SignupMessageState;
}

export interface SignupUserState extends SignupUser {
}

export interface SignupErrorsState extends SignupUser {
}

export interface SignupUser {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  firstname: string;
  lastname: string;
  phone: string;

  [key: string]: string;
}

export interface SignupMessageState {
  status: string,
  value: string
}

// Signup Action Types
export interface UpdateSignupUser extends Action {
  type: '@@signup/UPDATE_SIGNUP_USER';
  payload: {
    user: SignupUserState;
  };
}

export interface UpdateSignupErrors extends Action {
  type: '@@signup/UPDATE_SIGNUP_ERRORS';
  payload: {
    errors: SignupErrorsState;
  }
}

export interface UpdateSignupMessage extends Action {
  type: '@@signup/UPDATE_SIGNUP_MESSAGE';
  payload: {
    message: SignupMessageState;
  }
}

export interface ResetSignupState extends Action {
  type: '@@signup/RESET_SIGNUP_STATE'
}

export type SignupActions = (
  UpdateSignupUser | UpdateSignupErrors |
  UpdateSignupMessage | ResetSignupState
  );
