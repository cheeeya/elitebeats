import { RECEIVE_SONG_PROFILE } from '../actions/song_actions';
import { RECEIVE_COMMENT, REMOVE_COMMENT } from '../actions/comment_actions';
import { merge } from 'lodash';

const songProfileReducer = (state = {}, action) => {
  Object.freeze(state);
  let newState = {};
  switch (action.type) {
    case RECEIVE_SONG_PROFILE:
      let song = action.song;
      let fullUrl = song.author_url + "/" + song.permalink;
      newState = merge({}, state, { [fullUrl]: song});
      return newState;
    case RECEIVE_COMMENT:
      let comment = action.comment;
      fullUrl = comment.song_full_url;
      newState = merge({}, state, { [fullUrl]: { comments: { [comment.id]: comment }}})
      return newState;
    case REMOVE_COMMENT:
      comment = action.comment;
      fullUrl = comment.song_full_url;
      newState = merge({}, state);
      delete newState[fullUrl]['comments'][comment.id]
      return newState;
    default:
      return state;
  }
}

export default songProfileReducer;
