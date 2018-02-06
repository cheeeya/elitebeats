import React from 'react';
import { withRouter, Route } from 'react-router-dom';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import SplashContainer from './splash_container';
import SessionFormContainer from './session_form_container';
import MainContainer from './main_container';
import NavBarContainer from './nav_bar_container';
import SongUploadFormContainer from './song_upload_form_container';


class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render () {
    let navBar;
    if (this.props.location.pathname !== "/") {
      navBar = (<NavBarContainer />);
    }
    return (
      <div id="app">
        {navBar}
        <AuthRoute exact path="/" component={SplashContainer} />
        <ProtectedRoute exact path="/stream" component={MainContainer} />
        <ProtectedRoute exact path="/home" component={MainContainer} />
        <Route exact path="/upload" component={SongUploadFormContainer} />
      </div>
    )
  }
}



export default withRouter(App);
