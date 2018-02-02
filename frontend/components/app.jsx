import React from 'react';
import SplashContainer from './splash_container';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import SessionFormContainer from './session_form_container';
import HomeContainer from './home_container';

const App = () => (
  <div>

    <AuthRoute path="/" component={SplashContainer} />
    <AuthRoute path="/signin" component={SessionFormContainer} />
    <ProtectedRoute path="/home" component={HomeContainer} />
  </div>
);


export default App;
