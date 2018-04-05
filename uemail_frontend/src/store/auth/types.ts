import { Action } from "redux";

export interface AuthUser {
  username: string;
  email: string;
  firstname: string;
  lastname: string;
}

export interface AuthState {
  user: {
    username: string;
    email: string;
    firstname: string;
    lastname: string;
    iat: number;
  } | null;

  isAuthenticated: boolean;
}

export interface SetCurrentUser extends Action {
  type: '@@auth/SET_CURRENT_USER';
  payload: {
    user: AuthUser;
  }
}

export type AuthActions = SetCurrentUser;
