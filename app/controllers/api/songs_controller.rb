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

  def fetch_song
    @user = User.find_by(profile_url: params[:profile_url])
    if (@user)
      @song = @user.songs.find_by(permalink: params[:permalink])
      if (@song)
        render :show
        return
      end
    end
    render json: ["Unable to find song."], status: 404
  end

  def trending
    @songs = Song.order(total_plays: :desc)
    render 'api/songs/trending'
  end

  private
  def song_params
    params.require(:song).permit(:title, :description, :genre, :songfile, :permalink, :image)
  end
end
