import { connect } from 'react-redux';
import SongPage from './song_page';

const mapStateToProps = state => ({
  currentUser: state.session.currentUser
});

export default connect(mapStateToProps, null) (SongPage);
