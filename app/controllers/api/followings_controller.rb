class Api::FollowingsController < ApplicationController
  def create
    following = Following.new({
      follower_id: current_user.id,
      followee_id: params[:followee_id]
    })
    if following.save
      @user = User.find(params[:followee_id])
      render '/api/users/show'
    else
      render json: following.errors.full_messages, status: 422
    end
  end

  def destroy
    following = Following.find(params[:id])

    if following.destroy
      @user = User.find(following.followee_id)
      render '/api/users/show'
    else
      render json: following.errors.full_messages, status: 422
    end
  end

end
