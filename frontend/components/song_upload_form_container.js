import { connect } from 'react-redux';
import { createSong } from '../actions/song_actions';
import SongUploadForm from './song_upload_form';

const mapStateToProps = state => ({
  currentUser: state.session.currentUser
});

const mapDispatchToProps = dispatch => ({
  createSong: (formData) => dispatch(createSong(formData))
});

export default connect(mapStateToProps, mapDispatchToProps) (SongUploadForm);
