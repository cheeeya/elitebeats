import { connect } from 'react-redux';
import { getSongFromPlaylist } from '../util/player_util';
import { playSong, pauseSong } from '../actions/player_actions';
import Player from './player';

const mapStateToProps = state => ({
  song: state.player.currentSong
});

const mapDispatchToProps = dispatch => ({
  play: (song) => dispatch(playSong(song)),
  pause: () => dispatch(pauseSong())
});

export default connect(mapStateToProps, mapDispatchToProps) (Player);
