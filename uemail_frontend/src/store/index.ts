import { combineReducers, Dispatch, Reducer } from "redux";
import { routerReducer } from 'react-router-redux';

import { LoginState } from './login/types';
import loginReducer from './login/reducer';

import { SignupState} from "./signup/types";
import signupReducer from "./signup/reducer";

import { AuthActions, AuthState } from "./auth/types";
import authReducer from "./auth/reducer";

import { SendState } from "./send/types";
import sendReducer from './send/reducer';
import { initialState } from "../index";

export interface ApplicationState {
  login: LoginState,
  signup: SignupState,
  auth: AuthState,
  send: SendState
}

const reducers: Reducer<ApplicationState> = combineReducers<ApplicationState>({
  router: routerReducer,
  login: loginReducer,
  signup: signupReducer,
  auth: authReducer,
  send: sendReducer
});

export const rootReducer: Reducer<ApplicationState> = (state: ApplicationState, action) => {
  if ((action as AuthActions).type === '@@root/RESET_STORE') {
    state = undefined!;
  }
  return reducers(state, action);
};

export interface ConnectedReduxProps<S> {
  dispatch: Dispatch<S>;
}
