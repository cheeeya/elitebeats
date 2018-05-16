import { RECEIVE_USER_PROFILE } from '../actions/profile_actions';
import { RECEIVE_FOLLOWER, REMOVE_FOLLOWER } from '../actions/follow_actions';
import { RECEIVE_LIKE, REMOVE_LIKE } from '../actions/like_actions';
import { merge, pick, keys, mergeWith, isArray } from 'lodash';
import songReducer from './song_reducer';

const replaceArrays = (o, n) => {
  if (isArray(o)) {
    return n;
  }
}

const profileReducer = (state = {}, action) => {
  Object.freeze(state);
  let newState = {}, followers = [];
  switch (action.type) {
    case RECEIVE_USER_PROFILE:
      let userData = action.userData;
      newState =  merge({}, state);
      delete newState[userData.profile_url];
      newState = merge(newState, { [userData.profile_url]: userData });
      return newState;
    case RECEIVE_FOLLOWER:
      newState = merge({}, state);
      if (newState[action.userUrl]) {
        followers = newState[action.userUrl].user_followers;
        if (!followers.indexOf(action.followerId) > -1) {
          followers.push(action.followerId);
        }
      }
      return newState;
    case REMOVE_FOLLOWER:
      newState = merge({}, state);
      if (newState[action.userUrl]) {
        followers = newState[action.userUrl].user_followers;
        let index = followers.indexOf(action.followerId);
        if (index > -1 ) {
          followers.splice(index, 1);
        }
      }
      return newState;
    case RECEIVE_LIKE:
      newState = merge({}, state);
      let tracks = newState[action.authorUrl]["tracks"];
      let playlists = Object.keys(tracks).map(el => tracks[el]);
      for (let i = 0; i < playlists.length; i++) {
        merge(playlists[i], songReducer(playlists[i], action));
        console.log(playlists[i]);
      }
      return newState;
    case REMOVE_LIKE:
      newState = merge({}, state);
      tracks = newState[action.authorUrl]["tracks"];
      playlists = Object.keys(tracks).map(el => tracks[el]);
      for (let i = 0; i < playlists.length; i++) {
        mergeWith(playlists[i], songReducer(playlists[i], action), replaceArrays);
      }
      return newState;
    default:
      return state;
  }
}

export default profileReducer;
