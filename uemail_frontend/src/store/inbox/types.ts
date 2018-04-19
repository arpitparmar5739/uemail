import { Action } from "redux";

export interface InboxState {
  currentPage: number;
  totalEmails: number;
  emails: InboxEmail[];
}

export interface InboxEmail {
  id: number;
  isRead: boolean;
  senderName: string;
  subject: string;
  time: string;
}

// Inbox Actions
export interface UpdateCurrentPageEmails extends Action {
  type: '@@inbox/UPDATE_CURRENT_PAGE_EMAILS';
  payload: {
    emails: InboxEmail[];
  }
}

export interface UpdateTotalEmails extends Action {
  type: '@@inbox/UPDATE_TOTAL_EMAILS';
  payload: {
    totalEmails: number;
  }
}

export interface UpdateCurrentPage extends Action {
  type: '@@inbox/UPDATE_CURRENT_PAGE';
  payload: {
    currentPage: number;
  }
}

export type InboxActions = (UpdateCurrentPageEmails | UpdateTotalEmails | UpdateCurrentPage);
