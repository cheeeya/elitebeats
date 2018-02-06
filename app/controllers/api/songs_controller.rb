class Api::SongsController < ApplicationController

  def index
    @songs = Song.all
    render :index
  end

  def create
    @song = Song.new(song_params)
    @song.author_id = current_user.id
    if @song.save
      render :show
    else
      render json: @song.errors.full_messages, status: 422
    end
  end


  private
  def song_params
    params.require(:song).permit(:title, :desciption)
  end
end
