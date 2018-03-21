export const postComment = (comment, songId) => (
  $.ajax({
    method: 'POST',
    url: `api/songs/${songId}/comments`,
    data: { comment }
  })
);

export const deleteComment = (commentId) => (
  $.ajax({
    method: 'DELETE',
    url: `api/comments/${commentId}`
  })
);
