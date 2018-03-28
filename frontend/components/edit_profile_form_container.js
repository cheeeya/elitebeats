import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import EditProfileForm from './edit_profile_form';
import { updateUserData } from '../actions/session_actions';

const mapStateToProps = (state, ownProps) => {
  let profileUrl = ownProps.location.pathname.slice(1);
  return {
    currentUserId: state.session.currentUser.id,
    profile: state.entities.profiles[profileUrl],
    errors: state.errors.session
  };
}


const mapDispatchToProps = dispatch => ({
  update: (formData, user_id) => dispatch(updateUserData(formData, user_id))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps) (EditProfileForm));
