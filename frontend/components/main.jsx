import React from 'react';
import { Link } from 'react-router-dom';
import SongIndexContainer from './song_index_container';


class Main extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <main>
        <Link to="/stream">Stream</Link>
        <SongIndexContainer />
      </main>
    );
  }
}

export default Main;
