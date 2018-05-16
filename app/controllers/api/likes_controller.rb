class Api::LikesController < ApplicationController
  def create
    @like = Like.new
    @like.song_id = params[:song_id]
    @like.user_id = current_user.id
    if @like.save
      render json: @like, status: 200
    else
      render json: @like.errors.full_messages, status: 422
    end
  end

  def destroy
    @like = Like.find(params[:id])
    if @like
      render json: @like.delete, status: 200
    else
      render json: ["Like does not exist"], status: 404
    end
  end
end
