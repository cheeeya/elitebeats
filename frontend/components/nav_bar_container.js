import { connect } from 'react-redux';
import { logout, receiveFormType } from '../actions/session_actions';
import { pauseSong } from '../actions/player_actions';
import NavBar from './nav_bar';

const mapStateToProps = state => ({
  currentUser: state.session.currentUser,
});

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout()),
  receiveFormType: (formType) => dispatch(receiveFormType(formType)),
  pause: () => dispatch(pauseSong())
});

export default connect(mapStateToProps, mapDispatchToProps) (NavBar);
