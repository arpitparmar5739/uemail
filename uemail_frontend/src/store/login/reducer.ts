import { Reducer } from "redux";
import { LoginState, LoginActions, LoginUserState } from "./types";

const initUserState: LoginUserState = {
  username: '',
  password: ''
};

export const initialLoginState: LoginState = {
  user: {...initUserState},
  errors: {...initUserState},
  message: {
    status: '',
    value: ''
  }
};

const reducer: Reducer<LoginState> = (state: LoginState = initialLoginState, action) => {
  switch ((action as LoginActions).type) {
    case '@@login/UPDATE_LOGIN_USER':
      return {...state, user: action.payload.user};
    case '@@login/UPDATE_LOGIN_ERRORS':
      return {...state, errors: action.payload.error};
    case '@@login/UPDATE_LOGIN_MESSAGE':
      return {...state, message: action.payload.message};
    case '@@login/RESET_LOGIN_STATE':
      return {...state, user: {...initUserState}, errors: {...initUserState}, message: {status: '', value: ''}};
    default:
      return state;
  }
};

export default reducer;
