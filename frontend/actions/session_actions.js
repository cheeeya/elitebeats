export const RECEIVE_CURRENT_USER = 'RECEIVE_CURRENT_USER';
export const RECEIVE_ERRORS = 'RECEIVE_ERRORS';
import * as SessionAPIUtil from '../util/session_api_util';

const receiveCurrentUser = currentUser => ({
  type: RECEIVE_CURRENT_USER,
  currentUser
});

const receiveErrors = errors => ({
  type: RECEIVE_ERRORS,
  errors
});

export const login = user => dispatch => (
  SessionAPIUtil.login(user).then(u => dispatch(receiveCurrentUser(u)))
);

export const signup = user => dispatch => (
  SessionAPIUtil.signup(user).then(u => dispatch(receiveCurrentUser(u)))
);

export const logout = () => dispatch => (
  SessionAPIUtil.logout().then(u => dispatch(receiveCurrentUser(null)))
);
