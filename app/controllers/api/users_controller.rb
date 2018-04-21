class Api::UsersController < ApplicationController

  def verify_user_exists
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

  def get_user
    @user = User.find_by(profile_url: params[:profile_url])
    if @user
      render 'api/users/profile'
    else
      render json: ['Unable to find user.'], status: 404
    end
  end

  def index
    @users = User.all
    render :index
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
    render json: @user.delete
  end

  def update
    @user = User.find(params[:id])
    if @user.update(user_params)
      render 'api/users/profile'
    else
      render json: @user.errors.full_messages, status: 422
    end
  end

  private
  def user_params
    params.require(:user).permit(:email, :password, :age, :display_name,
      :profile_url, :profile_picture, :cover, :bio, :first_name, :last_name,
      :city, :country)
  end
end
