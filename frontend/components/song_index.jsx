import React from 'react';  
import SongIndexItem from './song_index_item';


class SongIndex extends React.Component {
  constructor (props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchAllSongs();
  }

  render () {
    const { songs } = this.props;
    return (
      <section className="songs-index">
        <ul className="songs-list">
          {
            songs.map(song => <SongIndexItem song={song} key={song.id} />)
          }
        </ul>
      </section>
    );
  }
}

export default SongIndex;
