

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
