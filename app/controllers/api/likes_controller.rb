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
end
