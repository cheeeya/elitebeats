class Api::UsersController < ApplicationController

  def get_user
    @user = User.find_by_identifier(params[:user][:identifier])
    if @user
      @login = 'login'
    elsif params[:user][:validEmail] == 'true'
      @login = 'signup'
    else
      render json: ['Enter a valid email address or profile url.'], status: 406
      return
    end
    render json: @login.to_json
  end

  def create
    @user = User.new(user_params)
    if @user.save
      login(@user)
      render :show
    else
      render json: @user.errors.full_messages, status: 422
    end
  end

  def destroy
    @user = User.find(params[:id])
    render json: @user.destroy!
  end

  def update
    @user = User.find(params[:id])
    if @user.update(user_params)
      render :show
    else
      render json: @user.errors.full_messages, status: 422
    end
  end

  private
  def user_params
    params.require(:user).permit(:email, :password, :age, :display_name)
  end
end
