class Api::CommentsController < ApplicationController
  def create
    comment = Comment.new(comment_params)
    comment.user = current_user
    klass = comment_params[:commentable_type].constantize
    name = comment_params[:commentable_type].underscore
    instance_variable_set("@#{name}", klass.find(params["#{name}_id"]))
    instance_variable_get("@#{name}").comments << comment

    if instance_variable_get("@#{name}").save
      render "/api/#{name}s/show"
    else
      render json: comment.errors.full_messages
    end
  end

  def index

  end

  private
  def comment_params
    params.require(:comment).permit(:commentable_type, :commentable_id, :body, :comment_time)
  end

end
