export const RECEIVE_ALL_USERS = 'RECEIVE_ALL_USERS';
import * as UserAPIUtil from '../util/user_api_util.js';

export const receiveAllUsers = users => ({
  type: RECEIVE_ALL_USERS,
  users
});

export const fetchAllUsers =  () => dispatch => (
  UserAPIUtil.fetchAllUsers().then(
    users => {
      dispatch(receiveAllUsers(users));
    }
  )
);
