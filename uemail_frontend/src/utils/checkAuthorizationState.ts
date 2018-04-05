import { store } from "../index";

export function checkAuthorizationState(): boolean {
  return store.getState().auth.isAuthenticated;
}
