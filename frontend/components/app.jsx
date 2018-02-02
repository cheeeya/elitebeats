import React from 'react';
import SplashContainer from './splash_container';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import SessionFormContainer from './session_form_container';
import HomeContainer from './home_container';
import NavBarContainer from './nav_bar_container';

const App = () => (
  <div id="app">
    <AuthRoute path="/" component={SplashContainer} />
    <ProtectedRoute path="/home" component={HomeContainer} />
  </div>
);


export default App;
