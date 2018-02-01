import { connect } from 'react-redux';
import { logout, receiveFormType } from '../actions/session_actions';
import NavBar from './nav_bar';

const mapStateToProps = state => ({
  currentUser: state.session.currentUser,
});

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout()),
  receiveFormType: (formType) => dispatch(receiveFormType(formType))
});

export default connect(mapStateToProps, mapDispatchToProps) (NavBar);
