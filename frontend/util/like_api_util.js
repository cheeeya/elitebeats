export const likeSong = songId => (
  $.ajax({
    method: 'POST',
    url: `api/songs/${songId}/likes`
  })
);

export const unlikeSong = likeId => (
  $.ajax({
    method: 'DELETE',
    url: `api/likes/${likeId}`
  })
);
