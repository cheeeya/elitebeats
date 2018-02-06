import React from 'react';
import { Link } from 'react-router-dom';
import SongIndexContainer from './song_index_container';

class Main extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let element;
    if (this.props.location.pathname === '/stream') {
      element = <SongIndexContainer />
    }
    return (
      <main className="main">
        <Link to="/stream">Stream</Link>
        <Link to="/home">Discover</Link>
        {element}
      </main>
    );
  }
}

export default Main;
