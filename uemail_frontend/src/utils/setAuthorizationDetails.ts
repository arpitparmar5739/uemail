import axios from 'axios';
import { store } from '../index';
import { resetStore, setCurrentUser } from '../store/auth/actions';
import jwt from 'jsonwebtoken';

export default function setAuthorizationDetails(token: string | null) {
  if (token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
    store.dispatch(setCurrentUser(jwt.decode(token)));
  } else {
    delete axios.defaults.headers.common.Authorization;
    store.dispatch(resetStore());
  }
}
