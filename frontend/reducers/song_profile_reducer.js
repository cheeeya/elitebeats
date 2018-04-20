import { RECEIVE_SONG_PROFILE } from '../actions/song_actions';
import { RECEIVE_COMMENT, REMOVE_COMMENT } from '../actions/comment_actions';
import { RECEIVE_FOLLOWER, REMOVE_FOLLOWER } from '../actions/follow_actions';
import { merge } from 'lodash';

const songProfileReducer = (state = {}, action) => {
  Object.freeze(state);
  let newState = {}, followers = [];
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
    case RECEIVE_FOLLOWER:
      newState = merge({}, state);
      if (newState[action.songUrl]) {
        followers = newState[action.userUrl].author_followers;
        if (!followers.includes(action.followerId)) {
          followers.push(action.followerId);
        }
      }
      return newState;
    case REMOVE_FOLLOWER:
      newState = merge({}, state);
      if (newState[action.songUrl]) {
        followers = newState[action.songUrl].author_followers;
        let index = followers.indexOf(action.followerId);
        if (index > -1 ) {
          followers.splice(index, 1);
        }
      }
      return newState;
    default:
      return state;
  }
}

export default songProfileReducer;
