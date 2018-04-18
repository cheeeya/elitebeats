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
    updateRequired: state.session.updateRequired
  });
};

const mapDispatchToProps = dispatch => ({
  fetchUserProfile: (profile_url) => dispatch(fetchUserProfile(profile_url)),
  update: (formData, user_id) => dispatch(updateUserData(formData, user_id)),
  finishUpdate: () => dispatch(finishUpdate()),
  follow: (userId, userUrl) => dispatch(follow(userId, userUrl)),
  unfollow: (userId, userUrl) => dispatch(unfollow(userId, userUrl))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps) (UserProfile));
