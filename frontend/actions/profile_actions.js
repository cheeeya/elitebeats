export const RECEIVE_USER_PROFILE = 'RECEIVE_USER_PROFILE';
import * as UserAPIUtil from '../util/user_api_util.js';
import { receivePlaylist } from '../actions/playlist_actions';

const receiveUserProfile = userData => ({
  type: RECEIVE_USER_PROFILE,
  userData
});

export const fetchUserProfile = profile_url => dispatch => (
  UserAPIUtil.fetchUserData(profile_url).then(
    userData => {
      dispatch(receiveUserProfile(userData));
      dispatch(receivePlaylist(userData.tracks.allTracks));
    })
);
