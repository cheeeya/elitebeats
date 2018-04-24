import { connect } from 'react-redux';
import { playSong, pauseSong, receiveCurrentPlaylist } from '../actions/player_actions';
import PlayableSongTile from './playable_song_tile';

const mapStateToProps = (state, ownProps) => ({
  song: ownProps.song
});



const mapDispatchToProps = dispatch => ({
  play: (song) => dispatch(playSong(song)),
  pause: () => dispatch(pauseSong()),
  updateCurrentPlaylist: (playlist) => dispatch(receiveCurrentPlaylist(playlist))
});


export default connect(mapStateToProps, mapDispatchToProps) (PlayableSongTile);
