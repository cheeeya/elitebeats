export const getSongFromPlaylist = (playlist, songIndex) => {
  let songArray = Object.keys(playlist).map(el => playlist[el]).reverse();
  if (songArray[songIndex]) {
    return songArray[songIndex];
  } else {
    if (songIndex < 0) {
      return songArray[0];
    }
  }
  return null;
}
