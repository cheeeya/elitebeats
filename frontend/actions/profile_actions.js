export const RECEIVE_USER_PROFILE = 'RECEIVE_USER_PROFILE';
export const RECEIVE_PROFILE_ERRORS = 'RECEIVE_PROFILE_ERRORS';
import * as UserAPIUtil from '../util/user_api_util.js';
import { receivePlaylist } from './playlist_actions';

export const receiveUserProfile = userData => ({
  type: RECEIVE_USER_PROFILE,
  userData
});

export const receiveProfileErrors = errors => ({
  type: RECEIVE_PROFILE_ERRORS,
  errors
})

export const fetchUserProfile = profile_url => dispatch => (
  UserAPIUtil.fetchUserData(profile_url).then(
    userData => {
      dispatch(receiveUserProfile(userData));
      dispatch(receivePlaylist(userData.tracks.allTracks));
    },
    errors => dispatch(receiveProfileErrors(errors.responseJSON))
  )
);
