import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { fetchSong } from '../actions/song_actions';
import { playSong, pauseSong, receiveCurrentPlaylist } from '../actions/player_actions';
import { postComment, deleteComment } from '../actions/comment_actions';
import { follow, unfollow } from '../actions/follow_actions';
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
    allSongs: state.entities.playlists.allSongs,
    currentPlaylist: state.player.currentPlaylist,
    currentUser: state.session.currentUser,
    errors: state.errors.songProfile,
    permalink:  ownProps.match.params.permalink,
    profileUrl: ownProps.match.params.author_url,
    songProfile,
    status
  };
}



const mapDispatchToProps = dispatch => ({
  fetchAllSOngs: () => dispatch(fetchAllSongs()),
  fetchSong: (profileUrl, permalink) => dispatch(fetchSong(profileUrl, permalink)),
  play: (song) => dispatch(playSong(song)),
  pause: () => dispatch(pauseSong()),
  updateCurrentPlaylist: (playlist) => dispatch(receiveCurrentPlaylist(playlist)),
  postComment: (comment, songId) => dispatch(postComment(comment, songId)),
  deleteComment: (commentId) => dispatch(deleteComment(commentId)),
  follow: (userId, userUrl, songUrl) => dispatch(follow(userId, userUrl, songUrl)),
  unfollow: (userId, userUrl, songUrl) => dispatch(unfollow(userId, userUrl, songUrl))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps) (SongProfile));
