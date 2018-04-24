import React from 'react';
import SessionFormModal from './session_form_modal';
import PlayableSongTileContainer from './playable_song_tile_container';

class Splash extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchTrending();
  }

  render() {
    const { trendingList } = this.props;
    const trendingArray = Object.keys(trendingList).map(el => trendingList[el]).reverse();
    return(
      <div className="splash-main-div">
        <div className="splash-hero" id="splash-hero">
          <div className="splash-logo">
            <h1>ELITEBEATS</h1>
          </div>
          <SessionFormModal
            receiveFormType={this.props.receiveFormType}
            loc="splash-hero"
          />
          <div className='splash-hero-notice' id="splash-notice">
            <h1 className="splash-text-h1">Connect on EliteBeats</h1>
            <h2 className="splash-text-h2">
              Discover, stream, and share a constantly expanding mix of music
              from emerging and major artists around the world.
            </h2>
            <SessionFormModal
              receiveFormType={this.props.receiveFormType}
              loc="splash-notice"
            />
          </div>
        </div>
        <div className='splash-lower'>
          <div className='splash-search-bar'>
            <label>
              <input
                className="search-input"
                placeholder="Search for artists, bands, tracks, podcasts"
              />
            </label>
          </div>
          <div className="splash-trending">
            <h1 className="trending-h1">
              Hear what’s trending in the EliteBeats community
            </h1>
            <ul className="trending-list">
              <div className="trending-list-wrapper">
                {trendingArray.slice(0, 12).map(song => (
                  <li className="trending-list-el" key={song.id}>
                    <PlayableSongTileContainer song={song} playlist={"trendingSongs"} />
                  </li>
                ))}
              </div>
            </ul>
          </div>
          <button id="explore-bttn" className='session-button' >
            Explore our top 50
          </button>
        </div>
      </div>
    )
  }
}

export default Splash;
