export const getSongFromPlaylist = (playlist, songIndex) => {
  if (playlist[songIndex]) {
    return playlist[songIndex];
  } else {
    if (playlist < 0) {
      return playlist[0];
    }
  }
  return null;
}
