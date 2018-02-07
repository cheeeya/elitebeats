import React from 'react';
import { withRouter, Route, Switch } from 'react-router-dom';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import SplashContainer from './splash_container';
import SessionFormContainer from './session_form_container';
import MainContainer from './main_container';
import NavBarContainer from './nav_bar_container';
import SongUploadFormContainer from './song_upload_form_container';
import SongPageContainer from './song_page_container';
import UserProfileContainer from './user_profile_container';

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
        <Switch>
          <AuthRoute exact path="/" component={SplashContainer} />
          <ProtectedRoute exact path="/stream" component={MainContainer} />
          <ProtectedRoute exact path="/home" component={MainContainer} />
          <ProtectedRoute exact path="/upload" component={SongUploadFormContainer} />
          <Route exact path="/:author_url/:permalink" component={SongPageContainer} />
          <Route exact path="/:author_url" component={UserProfileContainer} />
        </Switch>
      </div>
    )
  }
}



export default withRouter(App);
