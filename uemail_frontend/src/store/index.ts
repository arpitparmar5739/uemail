import { combineReducers, Dispatch, Reducer } from "redux";
import { routerReducer } from 'react-router-redux';

import { LoginState } from './login/types';
import loginReducer from './login/reducer';

import { SignupState} from "./signup/types";
import signupReducer from "./signup/reducer";

import { AuthState } from "./auth/types";
import authReducer from "./auth/reducer";

export interface ApplicationState {
  login: LoginState,
  signup: SignupState,
  auth: AuthState
}

export const reducers: Reducer<ApplicationState> = combineReducers<ApplicationState>({
  router: routerReducer,
  login: loginReducer,
  signup: signupReducer,
  auth: authReducer
});

export interface ConnectedReduxProps<S> {
  dispatch: Dispatch<S>;
}
