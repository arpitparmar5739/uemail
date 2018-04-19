import { Reducer } from "redux";
import { SentActions } from "./types";
import { SentState } from "./types";

export function initialSentState(): SentState {
  return {
    currentPage: 1,
    totalEmails: 0,
    emails: []
  };
}

const reducer: Reducer<SentState> = (state: SentState = initialSentState(), action) => {
  switch ((action as SentActions).type) {
    case '@@sent/UPDATE_CURRENT_PAGE_EMAILS':
      return {...state, emails: action.payload.emails};
    case '@@sent/UPDATE_TOTAL_EMAILS':
      return {...state, totalEmails: action.payload.totalEmails};
    case '@@sent/UPDATE_CURRENT_PAGE':
      return {...state, currentPage: action.payload.currentPage};
    default:
      return state;
  }
};

export default reducer;
