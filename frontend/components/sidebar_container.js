import { connect } from 'react-redux';
import Sidebar from './sidebar';
import { fetchAllUsers } from '../actions/user_actions';

const mapStateToProps = state => ({
  userList: state.entities.userList
});

const mapDispatchToProps = dispatch => ({
  fetchUsers: () => dispatch(fetchAllUsers())
});

export default connect(mapStateToProps, mapDispatchToProps) (Sidebar);
