import { combineReducers, Dispatch, Reducer } from 'redux';
import { routerReducer } from 'react-router-redux';

import { LoginState } from './login/types';
import loginReducer from './login/reducer';

import { SignupState } from './signup/types';
import signupReducer from './signup/reducer';

import { AuthActions, AuthState } from './auth/types';
import authReducer from './auth/reducer';

import { SendState } from './send/types';
import sendReducer from './send/reducer';

import { InboxState } from './inbox/types';
import inboxReducer from './inbox/reducer';

import { ViewEmailState } from './view_email/types';
import viewEmailReducer from './view_email/reducer';

import { SentState } from './sent/types';
import sentReducer from './sent/reducer';

export interface ApplicationState {
  login: LoginState;
  signup: SignupState;
  auth: AuthState;
  send: SendState;
  inbox: InboxState;
  sent: SentState;
  view_email: ViewEmailState;
}

const reducers: Reducer<ApplicationState> = combineReducers<ApplicationState>({
  router: routerReducer,
  login: loginReducer,
  signup: signupReducer,
  auth: authReducer,
  send: sendReducer,
  inbox: inboxReducer,
  sent: sentReducer,
  view_email: viewEmailReducer
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
