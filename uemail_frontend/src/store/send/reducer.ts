import { Reducer } from "redux";
import { SendState, SendEmailActions, SendEmailState } from "./types";

function initSendEmailState(): SendEmailState {
  return {
    to: '',
    cc: '',
    bcc: '',
    subject: '',
    body: ''
  };
}

export function initialSendState(): SendState {
  return {
    email: initSendEmailState(),
    errors: initSendEmailState(),
    message: {
      status: '',
      value: ''
    }
  };
}

const reducer: Reducer<SendState> = (state: SendState = initialSendState(), action) => {
  switch ((action as SendEmailActions).type) {
    case '@@send/UPDATE_SEND_EMAIL':
      return {...state, email: action.payload.email};
    case '@@send/UPDATE_SEND_EMAIL_ERRORS':
      return {...state, errors: action.payload.error};
    case '@@send/UPDATE_SEND_EMAIL_MESSAGE':
      return {...state, message: action.payload.message};
    case '@@send/RESET_SEND_STATE':
      return {...state, ...initialSendState()};
    default:
      return state;
  }
};

export default reducer;
