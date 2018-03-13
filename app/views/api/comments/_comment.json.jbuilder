json.extract! comment, :id, :body, :author_id, :song_id, :created_at
if (comment.author.s_prof_pic_url)
  json.author_picture_url comment.author.s_prof_pic_url
else
  json.author_picture_url comment.author.profile_picture.url
end
json.author_name comment.author.display_name
json.author_url comment.author.profile_url
json.song_full_url "#{comment.author.profile_url}/#{comment.song.permalink}" 
