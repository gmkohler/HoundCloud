class UsersController < ApplicationController
  DEFAULT_USER_IMAGE_URL = "http://res.cloudinary.com/gmkohler/image/upload/v1444792510/Poodle_kqgsbm.png"
  DEFAULT_USER_COVER_IMAGE_URL = "http://res.cloudinary.com/gmkohler/image/upload/v1444792510/Poodle_kqgsbm.png"
  def new
    @user = User.new
    render :new
  end

  def create
    @user = User.new(user_params)
    @user.image_url ||= DEFAULT_USER_IMAGE_URL
    @user.cover_image_url ||= DEFAULT_USER_IMAGE_URL

    if @user.save
      login_user!(@user)
      redirect_to '/'
    else
      flash.now[:errors] = @user.errors.full_messages
      render :new
    end
  end

  private
  def user_params
    params.require(:user).permit(:username, :email, :password)
  end
end
