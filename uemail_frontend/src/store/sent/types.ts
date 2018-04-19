import { Action } from "redux";

export interface SentState {
  currentPage: number;
  totalEmails: number;
  emails: SentEmail[];
}

export interface SentEmail {
  id: number;
  senderName: string;
  subject: string;
  time: string;
}

// Sent Actions
export interface UpdateCurrentPageEmails extends Action {
  type: '@@sent/UPDATE_CURRENT_PAGE_EMAILS';
  payload: {
    emails: SentEmail[];
  }
}

export interface UpdateTotalEmails extends Action {
  type: '@@sent/UPDATE_TOTAL_EMAILS';
  payload: {
    totalEmails: number;
  }
}

export interface UpdateCurrentPage extends Action {
  type: '@@sent/UPDATE_CURRENT_PAGE';
  payload: {
    currentPage: number;
  }
}

export type SentActions = (UpdateCurrentPageEmails | UpdateTotalEmails | UpdateCurrentPage);
