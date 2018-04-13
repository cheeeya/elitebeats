export const createFollow = userId => (
  $.ajax({
    method: 'POST',
    url: `api/users/${userId}/follows`
  })
);

export const deleteFollow = followId => (
  $.ajax({
    method: 'DELETE',
    url: `api/follows/${followId}`
  })
);
