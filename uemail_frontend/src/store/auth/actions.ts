import { ActionCreator } from "react-redux";
import { AuthUser, SetCurrentUser } from "./types";

export const setCurrentUser: ActionCreator<SetCurrentUser> = (user: AuthUser) => ({
  type: '@@auth/SET_CURRENT_USER',
  payload: {
    user
  }
});
