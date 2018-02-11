json.extract! song, :id, :title, :description, :permalink, :author_id, :created_at, :genre
if (song.author.s_prof_pic_url)
  json.author_picture_url song.author.s_prof_pic_url
else
  json.author_picture_url song.author.profile_picture.url
end
json.author_name song.author.display_name
if song.seed_image_url
  json.image_url song.seed_image_url
else
  json.image_url asset_path(song.image.url)
end
json.author_url song.author.profile_url
if song.aws_url
  json.song_url song.aws_url
else
  json.song_url asset_path(song.songfile.url)
end
