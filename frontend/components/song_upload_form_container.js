import { connect } from 'react-redux';
import { createSong, updateSong } from '../actions/song_actions';
import SongUploadForm from './song_upload_form';

const mapStateToProps = (state, ownProps) => {
  let page = "page";
  let song = {
    song_url: "",
    title: "",
    genre: "none",
    description: "",
    permalink: "",
    image_url: "https://res.cloudinary.com/elitebeats/image/upload/v1518134441/default_album_kynclq.png",
    id: null
  }
  if (ownProps.page) {
    page = ownProps.page;
  }
  if (ownProps.song) {
    song = ownProps.song
  }
  return {
    currentUser: state.session.currentUser,
    page,
    song
  }
};

const mapDispatchToProps = dispatch => ({
  createSong: (formData) => dispatch(createSong(formData)),
  updateSong: (formData, song_id) => dispatch(updateSong(formData, song_id))
});

export default connect(mapStateToProps, mapDispatchToProps) (SongUploadForm);
