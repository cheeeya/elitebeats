import { connect } from 'react-redux';
import { playSong, pauseSong, receiveCurrentPlaylist } from '../actions/player_actions';
import PlayableSongTile from './playable_song_tile';

const mapStateToProps = (state, ownProps) => {
  let status = 'pause';
  if (state.player.currentSong && state.player.currentSong.id === ownProps.song.id) {
    status = state.player.currentSong.status;
  }
  return ({
    status,
    song: ownProps.song,
    currentPlaylist: state.player.currentPlaylist,
    playlist: ownProps.playlist
  })
}



const mapDispatchToProps = dispatch => ({
  play: (song) => dispatch(playSong(song)),
  pause: () => dispatch(pauseSong()),
  updateCurrentPlaylist: (playlist) => dispatch(receiveCurrentPlaylist(playlist))
});


export default connect(mapStateToProps, mapDispatchToProps) (PlayableSongTile);
