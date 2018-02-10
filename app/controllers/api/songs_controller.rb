class Api::SongsController < ApplicationController

  def index
    @songs = Song.all
    render :index
  end

  def create
    @song = Song.new(song_params)
    @song.author_id = current_user.id
    if @song.save!
      render :show
    else
      render json: @song.errors.full_messages, status: 422
    end
  end

  def update
    @song = Song.find(params[:id])
    if @song.update(song_params)
      render :show
    else
      render json: @song.errors.full_messages, status: 422
    end
  end

  def destroy
    @song = Song.find(params[:id])
    render json: @song.delete
  end


  private
  def song_params
    params.require(:song).permit(:title, :description, :genre, :songfile, :permalink, :image)
  end
end
