import { RECEIVE_ERRORS, RECEIVE_CURRENT_USER, RECEIVE_FORM_TYPE } from '../actions/session_actions';
import { merge } from 'lodash';

const sessionErrorsReducer = (state = [], action) => {
  Object.freeze(state);
  let newState = [];
  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      return newState;
    case RECEIVE_FORM_TYPE:
      return newState;
    case RECEIVE_ERRORS:
      return action.errors;
    default:
      return state;
  }
}

export default sessionErrorsReducer;
