class SessionsController < ApplicationController
  before_filter :require_logout!, except: :destroy
  def new
    render :new
  end

  def create
    user = User.find_by_credentials(
      params[:user][:email],
      params[:user][:password]
    )

    if user
      login_user!(user)
      redirect_to '/'
    else
      flash.now[:errors] = 'Incorrect username and/or password'
      render :new
    end
  end

  def destroy
    logout_user!
    render json: {}
  end

  private
  def session_params

  end
end
