import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import EditProfileForm from './edit_profile_form';

const mapStateToProps = (state, ownProps) => {
  let profileUrl = ownProps.location.pathname.slice(1);
  return {
    profile: state.entities.profiles[profileUrl]
  };
}


const mapDispatchToProps = dispatch => ({

})

export default withRouter(connect(mapStateToProps, mapDispatchToProps) (EditProfileForm));
