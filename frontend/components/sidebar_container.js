import { connect } from 'react-redux';
import Sidebar from './sidebar';
import { fetchAllUsers } from '../actions/user_actions';
import { follow, unfollow } from '../actions/follow_actions';

const mapStateToProps = state => ({
  currentUser: state.session.currentUser,
  userList: state.entities.userList
});

const mapDispatchToProps = dispatch => ({
  fetchUsers: () => dispatch(fetchAllUsers()),
  follow: (userId, userUrl) => dispatch(follow(userId, userUrl)),
  unfollow: (userId, userUrl) => dispatch(unfollow(userId, userUrl))
});

export default connect(mapStateToProps, mapDispatchToProps) (Sidebar);
