import { RECEIVE_ALL_SONGS, RECEIVE_SONG, REMOVE_SONG, RECEIVE_SONG_ERRORS } from '../actions/song_actions';
import { RECEIVE_LIKE, REMOVE_LIKE } from '../actions/like_actions';
import { merge } from 'lodash';
const songReducer = (state = {}, action) => {
  Object.freeze(state);
  let newState = {};
  switch (action.type) {
    case RECEIVE_ALL_SONGS:
      newState = merge({}, action.allSongs);
      delete newState.title;
      return newState;
    case RECEIVE_SONG_ERRORS:
      return state;
    case RECEIVE_SONG:
      let song = action.song;
      newState = merge(newState, state, { [song.id]: song });
      return newState;
    case RECEIVE_LIKE:
      newState = merge({}, state);
      song = newState[action.like.song_id];
      if (song && song.likes) {
        song.likes.push(action.like)
      }
      return newState;
    case REMOVE_LIKE:
      newState = merge({}, state);
      song = newState[action.like.song_id];
      if (song && song.likes) {
        let index = song.likes.indexOf(action.like);
        if (index > -1) {
          song.likes.splice(action.like);
        }
      }
      return newState;
    default:
      return state;
  }
}

export default songReducer;
