export const createFollow = userId => (
  $.ajax({
    method: 'POST',
    url: `api/users/${userId}/follows`
  })
);

export const deleteFollow = userId => (
  $.ajax({
    method: 'DELETE',
    url: `api/users/${userId}/follows`
  })
);
