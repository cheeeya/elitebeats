import { RECEIVE_CURRENT_USER, RECEIVE_FORM_TYPE, RECEIVE_ERRORS } from '../actions/session_actions';
import { merge } from 'lodash';

const _nullState = {
  currentUser: null,
  formType: ""
}

const sessionReducer = (state = _nullState, action) => {
  Object.freeze(state)
  let newState = {};
  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      newState = merge(newState, state);
      newState.currentUser = action.currentUser;
      return newState;
    case RECEIVE_FORM_TYPE:
      newState = merge(newState, state);
      newState.formType = action.formType;
      return newState;
    case RECEIVE_ERRORS:
      return state;
    default:
      return state;
  }
}

export default sessionReducer;
