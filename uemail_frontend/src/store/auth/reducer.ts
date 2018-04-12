import { Reducer } from "redux";
import { isEmpty } from 'lodash';
import { initialState } from "../../index";
import { AuthActions, AuthState } from "./types";

export function initialAuthState(): AuthState {
  return {
    isAuthenticated: false,
    user: {
      username: '',
      email: '',
      firstname: '',
      lastname: '',
      iat: 0
    }
  }
}

const reducer: Reducer<AuthState> = (state: AuthState = initialAuthState(), action) => {
  switch((action as AuthActions).type) {
    case '@@auth/SET_CURRENT_USER':
      return {...state,
        isAuthenticated: !isEmpty(action.payload.user),
        user: action.payload.user
      };
    default:
      return state;
  }
};

export default reducer;
