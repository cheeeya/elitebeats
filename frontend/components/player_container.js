import { connect } from 'react-redux';
import { playSong, pauseSong, getNextSong } from '../actions/player_actions';
import Player from './player';

const mapStateToProps = state => ({
  song: state.player.currentSong,
  currentPlaylist: state.entities.playlists[state.player.currentPlaylist],
  currentPlaylistTitle: state.player.currentPlaylist
});

const mapDispatchToProps = dispatch => ({
  play: (song) => dispatch(playSong(song)),
  pause: () => dispatch(pauseSong()),
  next: (currentPlaylist, nextSongIndex) => dispatch(getNextSong(currentPlaylist, nextSongIndex))
});

export default connect(mapStateToProps, mapDispatchToProps) (Player);
