export const RECEIVE_CURRENT_USER = 'RECEIVE_CURRENT_USER';
export const RECEIVE_ERRORS = 'RECEIVE_ERRORS';
export const RECEIVE_FORM_TYPE = 'RECEIVE_FORM_TYPE';
export const FINISH_UPDATE = 'FINISH_UPDATE';
import { receiveUserProfile } from './profile_actions';
import * as UserAPIUtil from '../util/user_api_util';
import * as SessionAPIUtil from '../util/session_api_util';

const receiveCurrentUser = currentUser => ({
  type: RECEIVE_CURRENT_USER,
  currentUser
});

export const receiveErrors = errors => ({
  type: RECEIVE_ERRORS,
  errors
});

export const receiveFormType = formType => ({
  type: RECEIVE_FORM_TYPE,
  formType
});

export const finishUpdate = () => ({
  type: FINISH_UPDATE
});

export const login = user => dispatch => (
  SessionAPIUtil.login(user).then(
    u => {
      dispatch(receiveCurrentUser(u));
      dispatch(receiveFormType(""));
    },
    errors => dispatch(receiveErrors(errors.responseJSON))
  )
);

export const signup = user => dispatch => (
  SessionAPIUtil.signup(user).then(
    u => {
      dispatch(receiveCurrentUser(u));
      dispatch(receiveFormType(""));
    },
    errors => dispatch(receiveErrors(errors.responseJSON))
  )
);

export const logout = () => dispatch => (
  SessionAPIUtil.logout().then(u => dispatch(receiveCurrentUser(null)))
);

export const getUser = user => dispatch => (
  SessionAPIUtil.getUser(user).then(
    formType => dispatch(receiveFormType(formType)),
    errors => dispatch(receiveErrors(errors.responseJSON))
  )
);

export const updateUserData = (formData, user_id) => dispatch => (
  UserAPIUtil.updateUserData(formData, user_id).then(
    u => {
      dispatch(receiveCurrentUser(u));
      dispatch(receiveUserProfile(u));
    },
    errors => dispatch(receiveErrors(errors.responseJSON))
  )
);
