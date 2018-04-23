import React from 'react';
import { Link } from 'react-router-dom';
import SongIndexContainer from './song_index_container';
import SidebarContainer from './sidebar_container';

class Main extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let element;
    let streamActive;
    let discoverActive;
    if (this.props.location.pathname === '/stream') {
      element = <SongIndexContainer />
      streamActive = "selected-tab";
    } else if (this.props.location.pathname === '/discover') {
      discoverActive = "selected-tab";
    }
    return (
      <section className="main">
        <section className="main-section">
          <div className="main-tabs">
            <Link className={`main-tab-link ${streamActive}`} to="/stream">Stream</Link>
            <Link className={`main-tab-link ${discoverActive}`} to="/discover">Discover</Link>
          </div>
          {element}
        </section>
        <SidebarContainer />
      </section>
    );
  }
}

export default Main;
