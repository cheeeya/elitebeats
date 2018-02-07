
export const fetchUserData = profile_url => (
  $.ajax({
    method: 'GET',
    url: `api/users/${profile_url}`
  })
)
