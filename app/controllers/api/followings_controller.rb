class Api::FollowingsController < ApplicationController

  def create
    @user = User.find(params[:user_id])
    @user.followers << current_user

    if @user.save
      render '/api/users/show'
    else
      render json: following.errors.full_messages, status: 422
    end
  end

  def destroy
    @user = User.find(params[:user_id])
    @user.followers.delete(current_user)

    if @user.save
      render '/api/users/show'
    else
      render json: following.errors.full_messages, status: 422
    end
  end

end
