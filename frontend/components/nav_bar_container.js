import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { logout, receiveFormType } from '../actions/session_actions';
import { pauseSong } from '../actions/player_actions';
import NavBar from './nav_bar';

const mapStateToProps = (state, ownProps) => ({
  currentUser: state.session.currentUser,
  route: ownProps.location.pathname
});

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout()),
  receiveFormType: (formType) => dispatch(receiveFormType(formType)),
  pause: () => dispatch(pauseSong())
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps) (NavBar));
