import React from 'react';
import SplashContainer from './splash_container';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import SessionFormContainer from './session_form_container';
import MainContainer from './main_container';
import NavBarContainer from './nav_bar_container';
import { withRouter } from 'react-router-dom';

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
        <ProtectedRoute path="/home" component={MainContainer} />
      </div>
    )
  }
}



export default withRouter(App);
