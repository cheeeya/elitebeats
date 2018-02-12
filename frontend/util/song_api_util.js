

export const fetchAllSongs = () => (
  $.ajax({
    method: 'GET',
    url: 'api/songs'
  })
);

export const createSong = (formData) => (
  $.ajax({
    method: 'POST',
    url: 'api/songs',
    processData: false,
    contentType: false,
    dataType: 'json',
    data: formData
  })
);

export const updateSong = (formData, songId) => (
  $.ajax({
    method: 'PATCH',
    url: `api/songs/${songId}`,
    processData: false,
    contentType: false,
    dataType: 'json',
    data: formData
  })
);

export const deleteSong = (songId) => (
  $.ajax({
    method: 'DELETE',
    url: `api/songs/${songId}`,
  })
);


export const fetchSong = (profile_url, permalink) => (
  $.ajax({
    method: 'GET',
    url: `api/users/${profile_url}/songs/${permalink}`
  })
);
