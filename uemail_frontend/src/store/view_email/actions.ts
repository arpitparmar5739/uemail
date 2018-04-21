import { ActionCreator } from 'react-redux';
import { UpdateCurrentPageEmail, UpdatePageTypeAndEmailId } from './types';
import { Email } from '../../containers/view_email/types';

export const updateCurrentPageEmail: ActionCreator<UpdateCurrentPageEmail> = (email: Email) => ({
  type: '@@view_email/UPDATE_CURRENT_PAGE_EMAIL',
  payload: {
    email
  }
});

export const updateViewEmailPageTypeAndEmailId: ActionCreator<UpdatePageTypeAndEmailId> =
  (pagType: string, emailId: number) => ({
    type: '@@view_email/UPDATE_PAGE_TYPE_AND_EMAIL_ID',
    payload: {
      page_type: pagType,
      email_id: emailId
    }
  });
