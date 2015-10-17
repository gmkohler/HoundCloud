class Api::UsersController < ApplicationController
  def index

    if params[:search_query]
      @users = User.find_by_search_query(params[:search_query])
    else
      @users = User.all
    end

    render :index
  end

  def show
    @user = User.find(params[:id])
    render json: @user
  end

end
