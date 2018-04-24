import { connect } from 'react-redux';
import { playSong, pauseSong, receiveCurrentPlaylist } from '../actions/player_actions';
import PlayableSongTile from './playabl_'

const mapStateToProps = (state) => {
  
}



const mapDispatchToProps = dispatch => ({
  play: (song) => dispatch(playSong(song)),
  pause: () => dispatch(pauseSong()),
  updateCurrentPlaylist: (playlist) => dispatch(receiveCurrentPlaylist(playlist))
});


export default connect(mapStateToProps, mapDispatchToProps) (PlayableSongTile);
