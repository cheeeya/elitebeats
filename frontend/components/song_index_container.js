import { connect } from 'react-redux';
import { fetchAllSongs } from '../actions/song_actions';
import { playSong, pauseSong } from '../actions/player_actions';
import SongIndex from './song_index';


const mapStateToProps = (state) => ({
   songs: Object.values(state.entities.playlists.allSongs),
   currentSong: state.player.currentSong
});

const mapDispatchToProps = (dispatch) => ({
  fetchAllSongs: () => dispatch(fetchAllSongs()),
  play: (song) => dispatch(playSong(song)),
  pause: () => dispatch(pauseSong())
});

export default connect(mapStateToProps, mapDispatchToProps) (SongIndex);
