import { RECEIVE_SONG_PROFILE } from '../actions/song_actions';
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
    default:
      return state;
  }
}

export default songProfileReducer;
