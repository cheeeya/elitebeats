import { connect } from 'react-redux';
import { receiveFormType } from '../actions/session_actions';
import { fetchTrendingList } from '../actions/playlist_actions';
import Splash from './splash';

const mapStateToProps = (state) => ({
  trendingList: state.entities.playlists.trendingSongs || {}
});

const mapDispatchToProps = dispatch => ({
  receiveFormType: (formType) => dispatch(receiveFormType(formType)),
  fetchTrending: () => dispatch(fetchTrendingList())
});

export default connect(mapStateToProps, mapDispatchToProps) (Splash);
