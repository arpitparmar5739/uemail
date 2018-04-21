import { Action } from 'redux';
import { Email } from '../../containers/view_email/types';

export interface ViewEmailState {
  page_type: string | null;
  email_id: number | null;
  email: Email | null;
}

// View Email Actions
export interface UpdateCurrentPageEmail extends Action {
  type: '@@view_email/UPDATE_CURRENT_PAGE_EMAIL';
  payload: {
    email: Email;
  };
}

export interface UpdatePageTypeAndEmailId extends Action {
  type: '@@view_email/UPDATE_PAGE_TYPE_AND_EMAIL_ID';
  payload: {
    page_type: string;
    email_id: number;
  };
}

export type ViewEmailActions = (UpdateCurrentPageEmail | UpdatePageTypeAndEmailId);
