import { ActionCreator } from "react-redux";
import { UpdateCurrentPageEmails, InboxEmail, UpdateTotalEmails, UpdateCurrentPage } from "./types";

export const updateCurrentPageEmails: ActionCreator<UpdateCurrentPageEmails> = (emails: InboxEmail[]) => ({
  type: "@@inbox/UPDATE_CURRENT_PAGE_EMAILS",
  payload: {
    emails
  }
});

export const updateTotalInboxEmails: ActionCreator<UpdateTotalEmails> = (totalEmails: number) => ({
  type: "@@inbox/UPDATE_TOTAL_EMAILS",
  payload: {
    totalEmails
  }
});

export const updateCurrentPage: ActionCreator<UpdateCurrentPage> = (currentPage: number) => ({
  type: "@@inbox/UPDATE_CURRENT_PAGE",
  payload: {
    currentPage
  }
});
