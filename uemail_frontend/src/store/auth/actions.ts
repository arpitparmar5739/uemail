import { ActionCreator } from 'react-redux';
import { AuthUser, ResetStore, SetCurrentUser } from './types';

export const setCurrentUser: ActionCreator<SetCurrentUser> = (user: AuthUser) => ({
  type: '@@auth/SET_CURRENT_USER',
  payload: {
    user
  }
});

export const resetStore: ActionCreator<ResetStore> = () => ({
  type: '@@root/RESET_STORE'
});
