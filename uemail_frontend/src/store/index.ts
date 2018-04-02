import { combineReducers, Dispatch, Reducer } from "redux";
import { routerReducer } from 'react-router-redux';

import { LoginState } from './login/types';
import loginReducer from './login/reducer';

import { SignupState} from "./signup/types";
import signupReducer from "./signup/reducer";

export interface ApplicationState {
  login: LoginState,
  signup: SignupState
}

export const reducers: Reducer<ApplicationState> = combineReducers<ApplicationState>({
  router: routerReducer,
  login: loginReducer,
  signup: signupReducer
});

export interface ConnectedReduxProps<S> {
  dispatch: Dispatch<S>;
}
