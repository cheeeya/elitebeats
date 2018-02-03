import React from 'react';
import SplashContainer from './splash_container';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import SessionFormContainer from './session_form_container';
import MainContainer from './main_container';
import NavBarContainer from './nav_bar_container';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render () {
    let nav;
    if (window.location.hash !== "#/") {
      nav = <NavBarContainer />
    }
    return (
      <div id="app">
        {nav}
        <AuthRoute path="/" component={SplashContainer} />
        <ProtectedRoute path="/home" component={MainContainer} />
      </div>
    )
  }
}



export default App;
