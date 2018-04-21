import { store } from '../index';

export function checkAuthorizationState(): boolean {
  if (!!localStorage.authToken) {
    return store.getState().auth.isAuthenticated;
  }
  return false;
}
