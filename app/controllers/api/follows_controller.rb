class Api::FollowsController < ApplicationController

  def create
    @follow = Follow.new
    @follow.user_id = params[:user_id]
    @follow.follower_id = current_user.id
    if @follow.save
      render json: ["followed"], stats: 200
    else
      render json: @follow.errors.full_messages, status: 422
    end
  end

  def destroy
    @follow = Follow.find(aprams[:id])
    @follow.delete
    render json: ["unfollowed"], status: 200
  end
end
