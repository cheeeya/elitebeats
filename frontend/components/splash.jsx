import React from 'react';
import SessionFormModal from './session_form_modal';
import NavBarContainer from './nav_bar_container';

class Splash extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div className="splash-div">
        <NavBarContainer />
        <div className='splash-notice'>
          <h1 className="splash-h1">Connect on EliteBeats</h1>
          <h2 className="splash-h2">Discover, stream, and share a constantly expanding mix of music from emerging and major artists around the world.</h2>
          <SessionFormModal receiveFormType={this.props.receiveFormType} loc="splash" />
        </div>
      </div>
    )
  }
}

export default Splash;
