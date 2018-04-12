import { Reducer } from "redux";
import { SignupState, SignupActions, SignupUser } from "./types";

function initUserState(): SignupUser {
  return {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    firstname: '',
    lastname: '',
    phone: ''
  }
}

export function initialSignupState(): SignupState {
  return {
    user: initUserState(),
    errors: initUserState(),
    message: {
      status: '',
      value: ''
    }
  }
}

const reducer: Reducer<SignupState> = (state: SignupState = initialSignupState(), action) => {
  switch ((action as SignupActions).type) {
    case '@@signup/UPDATE_SIGNUP_USER':
      return {...state, user: action.payload.user};
    case '@@signup/UPDATE_SIGNUP_ERRORS':
      return {...state, errors: action.payload.error};
    case '@@signup/UPDATE_SIGNUP_MESSAGE':
      return {...state, message: action.payload.message};
    case '@@signup/RESET_SIGNUP_STATE':
      return {...state, ...initialSignupState()};
    default:
      return state;
  }
};

export default reducer;
