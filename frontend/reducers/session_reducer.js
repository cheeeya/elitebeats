import {
  RECEIVE_CURRENT_USER,
  RECEIVE_FORM_TYPE,
  RECEIVE_ERRORS,
  RECEIVE_CURRENT_PLAYLIST,
  FINISH_UPDATE
} from '../actions/session_actions';
import { merge } from 'lodash';
import { REMOVE_SONG, RECEIVE_SONG } from '../actions/song_actions';

const _nullState = {
  currentUser: null,
  formType: "",
  updateRequired: false
}

const sessionReducer = (state = _nullState, action) => {
  Object.freeze(state)
  let newState = {};
  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      let currentUser = action.currentUser;
      newState = merge(newState, state, { currentUser });
      return newState;
    case RECEIVE_FORM_TYPE:
      let formType = action.formType;
      newState = merge(newState, state, { formType });
      return newState;
    case RECEIVE_ERRORS:
      return state;
    case RECEIVE_SONG:
    case REMOVE_SONG:
      return merge({}, state, { updateRequired: true });
    case FINISH_UPDATE:
      return merge({}, state, { updateRequired: false});
    default:
      return state;
  }
}

export default sessionReducer;
