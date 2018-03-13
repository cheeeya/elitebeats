export const postComment = (comment, songId) => (
  $.ajax({
    method: 'POST',
    url: `api/songs/${songId}/comments`,
    data: { comment }
  })
);
