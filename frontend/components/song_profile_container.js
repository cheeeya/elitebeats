import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { fetchSong } from '../actions/song_actions';
import { playSong, pauseSong, receiveCurrentPlaylist } from '../actions/player_actions';
import SongProfile from './song_profile';

const mapStateToProps = (state, ownProps) => {
  let url = ownProps.match.url.slice(1);
  let status = 'pause';
  let songProfile = state.entities.songProfiles[url];
  if (songProfile){
    if (state.player.currentSong && state.player.currentSong.id === songProfile.id) {
      status = state.player.currentSong.status;
    }
  }
  return {
    currentUser: state.session.currentUser,
    currentPlaylist: state.player.currentPlaylist,
    allSongs: state.entities.playlists.allSongs,
    profileUrl: ownProps.match.params.author_url,
    permalink:  ownProps.match.params.permalink,
    status,
    songProfile
  }
}



const mapDispatchToProps = dispatch => ({
  fetchAllSOngs: () => dispatch(fetchAllSongs()),
  fetchSong: (profileUrl, permalink) => dispatch(fetchSong(profileUrl, permalink)),
  play: (song) => dispatch(playSong(song)),
  pause: () => dispatch(pauseSong()),
  updateCurrentPlaylist: (playlist) => dispatch(receiveCurrentPlaylist(playlist))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps) (SongProfile));
