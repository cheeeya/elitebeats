class Api::FollowsController < ApplicationController

  def create
    @follow = Follow.new(follow_params)
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

  private
  def follow_params
    params.require(:follow).permit(:user_id)
  end
end
