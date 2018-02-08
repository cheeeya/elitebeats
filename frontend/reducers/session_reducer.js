import {
  RECEIVE_CURRENT_USER,
  RECEIVE_FORM_TYPE,
  RECEIVE_ERRORS,
  RECEIVE_CURRENT_PLAYLIST
} from '../actions/session_actions';
import { merge } from 'lodash';

const _nullState = {
  currentUser: null,
  formType: "",
  currentPlaylist: 'allSongs'
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
    case RECEIVE_CURRENT_PLAYLIST:
      let currentPlaylist = action.playlist;
      newState = merge(newState, state, { currentPlaylist });
      return newState;
    case RECEIVE_ERRORS:
      return state;
    default:
      return state;
  }
}

export default sessionReducer;
