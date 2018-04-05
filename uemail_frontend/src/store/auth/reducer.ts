import { isEmpty } from 'lodash';
import { AuthActions, AuthState } from "./types";
import { Reducer } from "redux";

export const initialAuthState: AuthState = {
  isAuthenticated: false,
  user: {
    username: '',
    email: '',
    firstname: '',
    lastname: '',
    iat: 0
  }
};

const reducer: Reducer<AuthState> = (state: AuthState = initialAuthState, action) => {
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
