import { combineReducers, Dispatch, Reducer } from "redux";
import { routerReducer } from 'react-router-redux';

import { LoginState } from './login/types';
import loginReducer from './login/reducer';

export interface ApplicationState {
  login: LoginState
}

export const reducers: Reducer<ApplicationState> = combineReducers<ApplicationState>({
  router: routerReducer,
  login: loginReducer
});

export interface ConnectedReduxProps<S> {
  dispatch: Dispatch<S>;
}
