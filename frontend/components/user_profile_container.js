import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import UserProfile from './user_profile';
import { fetchUserProfile } from '../actions/profile_actions';
import { updateUserData, finishUpdate } from '../actions/session_actions';
import { follow, unfollow } from '../actions/follow_actions';

const mapStateToProps = (state, ownProps) => {
  let profile_url;
  if (ownProps) {
    profile_url = ownProps.location.pathname.split("/")[1];
  }
  return ({
    currentUser: state.session.currentUser,
    profile: state.entities.profiles[profile_url],
    updateRequired: state.session.updateRequired,
    errors: state.errors.profile
  });
};

const mapDispatchToProps = dispatch => ({
  fetchUserProfile: (profile_url) => dispatch(fetchUserProfile(profile_url)),
  update: (formData, user_id) => dispatch(updateUserData(formData, user_id)),
  finishUpdate: () => dispatch(finishUpdate()),
  follow: (userId, userUrl, songUrl) => dispatch(follow(userId, userUrl, songUrl)),
  unfollow: (userId, userUrl, songUrl) => dispatch(unfollow(userId, userUrl, songUrl))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps) (UserProfile));
