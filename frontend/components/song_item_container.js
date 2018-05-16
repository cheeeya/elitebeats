import { connect } from 'react-redux';
import { playSong, pauseSong, receiveCurrentPlaylist } from '../actions/player_actions';
import { deleteSong } from '../actions/song_actions';
import { likeSong, unlikeSong } from '../actions/like_actions';
import SongItem from './song_item';

const mapStateToProps = (state, ownProps) => {
  let status = 'pause';
  if (state.player.currentSong && state.player.currentSong.id === ownProps.song.id) {
    status = state.player.currentSong.status;
  }
  return {
    status,
    song: ownProps.song,
    path: ownProps.path,
    currentUser: state.session.currentUser,
    currentPlaylist: state.player.currentPlaylist,
    playlist: ownProps.playlist
  }
}

const mapDispatchToProps = dispatch => ({
  play: (song) => dispatch(playSong(song)),
  pause: () => dispatch(pauseSong()),
  deleteSong: (songId) => dispatch(deleteSong(songId)),
  updateCurrentPlaylist: (playlist) => dispatch(receiveCurrentPlaylist(playlist)),
  likeSong: (songId, songUrl) => dispatch(likeSong(songId, songUrl)),
  unlikeSong: (likeId, songUrl) => dispatch(unlikeSong(likeId, songUrl))
});

export default connect(mapStateToProps, mapDispatchToProps) (SongItem);
