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
  follow: (userId, userUrl, songUrl) => dispatch(follow(userId, userUrl, songUrl)),
  unfollow: (userId, userUrl, songUrl) => dispatch(unfollow(userId, userUrl, songUrl))
});

export default connect(mapStateToProps, mapDispatchToProps) (Sidebar);
