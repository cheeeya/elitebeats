import React from 'react';
import { Link } from 'react-router-dom';
import SongItemContainer from './song_item_container';

class SongIndex extends React.Component {
  constructor (props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchAllSongs();
  }

  timeFormat(createdAt) {
    let postDate = new Date(createdAt);
    let now = new Date();
    let elapsedTime = (now - postDate) / 8.64e7;
    let timeString = " day";
    if (elapsedTime > 30) {
      elapsedTime = elapsedTime / 30;
      timeString = " month";
      if (elapsedTime >= 12) {
        elapsedTime = elapsedTime / 12;
        timeString = " year";
      }
    } else if (elapsedTime < 1) {
      elapsedTime = elapsedTime * 24;
      timeString = " hour";
      if (elapsedTime < 1) {
        elapsedTime = elapsedTime * 60;
        timeString = " minute";
        if (elapsedTime < 1) {
          timeString = "less than 1 minute";
        }
      }
    }
    elapsedTime = Math.floor(elapsedTime);
    if (elapsedTime > 0) {
      timeString = elapsedTime + timeString;
      if (elapsedTime > 1) {
        timeString += "s";
      }
    }
    return timeString+= " ago";
  }

  render () {
    const { songs, currentSong, pause, play, currentUser } = this.props;

    return (
      <section className="songs-index">
        <ul className="songs-index-list">
          {
            songs.map(song => {
              let time = this.timeFormat(song.created_at)
              return (
                <li className="song-index-list-item" key={song.id}>
                  <div className="song-list-user-div">
                    <Link to={song.author_url}><img className="song-list-user-img" src={song.author_picture_url} /></Link>
                    <span className="song-list-user-span">
                      <Link to={song.author_url}>{song.author_name}</Link><span className="song-list-user-span-inner">posted a track {time}</span>
                    </span>
                  </div>
                  <SongItemContainer song={song} path="stream" playlist="allSongs" />
                </li>
              );
            })
          }
        </ul>
      </section>
    );
  }
}

export default SongIndex;
