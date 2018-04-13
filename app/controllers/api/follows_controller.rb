class Api::FollowsController < ApplicationController

  def create
    @follow = Follow.new
    @follow.user_id = params[:user_id]
    @follow.follower_id = current_user.id
    if @follow.save
      render json: current_user.id, stats: 200
    else
      render json: @follow.errors.full_messages, status: 422
    end
  end

  def destroy
    @follow = Follow.find_by!(user_id: params[:user_id], follower_id:  current_user.id)
    @follow.delete
    render json: current_user.id, status: 200
  end
end
