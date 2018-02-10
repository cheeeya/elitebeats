json.extract! song, :id, :title, :description, :permalink, :author_id
json.author_name song.author.display_name
json.image_url asset_path(song.image.url)
json.author_url song.author.profile_url
if song.aws_url
  json.song_url song.aws_url
else
  json.song_url asset_path(song.songfile.url)
end
