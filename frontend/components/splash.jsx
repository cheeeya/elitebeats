import React from 'react';
import SessionFormModal from './session_form_modal';

class Splash extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div className="splash-main-div">
        <div className="splash-hero" id="splash-hero">
          <div className="splash-logo">
            <h1>ELITEBEATS</h1>
          </div>
          <SessionFormModal receiveFormType={this.props.receiveFormType} loc="splash-hero"/>
          <div className='splash-hero-notice' id="splash-notice">
            <h1 className="splash-text-h1">Connect on EliteBeats</h1>
            <h2 className="splash-text-h2">Discover, stream, and share a constantly expanding mix of music from emerging and major artists around the world.</h2>
            <SessionFormModal receiveFormType={this.props.receiveFormType} loc="splash-notice" />
          </div>
        </div>
        <div className='splash-lower'>
          <div className='splash-search-bar'>
            <label>
              <input placeholder="Search for artists, bands, tracks, podcasts" className="search-input"></input>
            </label>
          </div>
          <div className="splash-trending">
            <h1 className="trending-h1">Hear what’s trending in the EliteBeats community</h1>
              <ul className="trendingList">
                <div className="trending-list-wrapper">
                  <div className="trending-list-el"><li></li></div>
                  <div className="trending-list-el"><li></li></div>
                  <div className="trending-list-el"><li></li></div>
                  <div className="trending-list-el"><li></li></div>
                  <div className="trending-list-el"><li></li></div>
                  <div className="trending-list-el"><li></li></div>
                  <div className="trending-list-el"><li></li></div>
                  <div className="trending-list-el"><li></li></div>
                  <div className="trending-list-el"><li></li></div>
                  <div className="trending-list-el"><li></li></div>
                  <div className="trending-list-el"><li></li></div>
                  <div className="trending-list-el"><li></li></div>
                </div>
              </ul>
          </div>
          <button className='session-button' id="explore-bttn">Explore our top 50</button>
        </div>
      </div>
    )
  }
}

export default Splash;
