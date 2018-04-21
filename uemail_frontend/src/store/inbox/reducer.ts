import { Reducer } from 'redux';
import { InboxActions } from './types';
import { InboxState } from './types';

export function initialInboxState(): InboxState {
  return {
    currentPage: 1,
    totalEmails: 0,
    emails: []
  };
}

const reducer: Reducer<InboxState> = (state: InboxState = initialInboxState(), action) => {
  switch ((action as InboxActions).type) {
    case '@@inbox/UPDATE_CURRENT_PAGE_EMAILS':
      return {...state, emails: action.payload.emails};
    case '@@inbox/UPDATE_TOTAL_EMAILS':
      return {...state, totalEmails: action.payload.totalEmails};
    case '@@inbox/UPDATE_CURRENT_PAGE':
      return {...state, currentPage: action.payload.currentPage};
    default:
      return state;
  }
};

export default reducer;
