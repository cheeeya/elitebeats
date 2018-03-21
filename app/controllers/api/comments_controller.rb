class Api::CommentsController < ApplicationController
  def create
    @comment = Comment.new(comment_params)
    if !current_user
      render json: ["Must be logged in to comment"], status: 401
      return
    end
    @comment.author_id = current_user.id
    @comment.song_id = params[:song_id]
    if @comment.save!
      render :show
    else
      render json: @comment.errors.full_messages, status: 422
    end
  end

  def destroy
    @comment = Comment.find(params[:id])
    @comment = @comment.delete
    render :show
  end

  private
  def comment_params
    params.require(:comment).permit(:body)
  end
end
