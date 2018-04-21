import { Reducer } from 'redux';
import { ViewEmailActions, ViewEmailState } from './types';

export function initialViewEmailState(): ViewEmailState {
  return {
    email_id: null,
    page_type: null,
    email: null
  };
}

const reducer: Reducer<ViewEmailState> = (state: ViewEmailState = initialViewEmailState(), action) => {
  switch ((action as ViewEmailActions).type) {
    case '@@view_email/UPDATE_CURRENT_PAGE_EMAIL':
      return {...state, email: action.payload.email};
    case '@@view_email/UPDATE_PAGE_TYPE_AND_EMAIL_ID':
      return {...state, email_id: action.payload.email_id, page_type: action.payload.page_type};
    default:
      return state;
  }
};

export default reducer;
