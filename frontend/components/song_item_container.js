import { connect } from 'react-redux';
import { playSong, pauseSong } from '../actions/player_actions';
import { deleteSong } from '../actions/song_actions';
import SongIndexItem from './song_index_item';

const mapStateToProps = (state, ownProps) => {
  let status = 'pause';
  if (state.player.currentSong && state.player.currentSong.id === ownProps.song.id) {
    status = state.player.currentSong.status;
  }
  return {
    status,
    song: ownProps.song,
    path: ownProps.path,
    currentUser: state.session.currentUser
  }
}

const mapDispatchToProps = dispatch => ({
  play: (song) => dispatch(playSong(song)),
  pause: () => dispatch(pauseSong()),
  deleteSong: (songId) => dispatch(deleteSong(songId))
});

export default connect(mapStateToProps, mapDispatchToProps) (SongIndexItem);
