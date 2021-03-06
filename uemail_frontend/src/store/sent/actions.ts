import { ActionCreator } from 'react-redux';
import { UpdateCurrentPageEmails, SentEmail, UpdateTotalEmails, UpdateCurrentPage } from './types';

export const updateCurrentPageEmails: ActionCreator<UpdateCurrentPageEmails> = (emails: SentEmail[]) => ({
  type: '@@sent/UPDATE_CURRENT_PAGE_EMAILS',
  payload: {
    emails
  }
});

export const updateTotalSentEmails: ActionCreator<UpdateTotalEmails> = (totalEmails: number) => ({
  type: '@@sent/UPDATE_TOTAL_EMAILS',
  payload: {
    totalEmails
  }
});

export const updateCurrentPage: ActionCreator<UpdateCurrentPage> = (currentPage: number) => ({
  type: '@@sent/UPDATE_CURRENT_PAGE',
  payload: {
    currentPage
  }
});
