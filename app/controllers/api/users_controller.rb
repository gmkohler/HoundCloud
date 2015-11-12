class Api::UsersController < ApplicationController
  def index
    # fail
    if params[:search_query]
      @users = User.find_by_search_query(params[:search_query])
    else
      @users = User.all
    end

    render :index
  end

  def show
    @user = User.find(params[:id])
    render :show
  end

  def follow_suggestions
    @users = User.find_follow_suggestions(current_user.id)
    render :index
  end
end
