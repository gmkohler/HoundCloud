class Api::CommentsController < ApplicationController
  def create
    klass = comment_params[:commentable_type].constantize
    name = comment_params[:commentable_type].underscore
    comment = new Comment(comment_params)
    comment.user_id = current_user.id
    comment.save

    instance_variable_set("@#{name}", klass.find(params["#{name}_id"]))
    render "/api/#{name}s/show"
  end

  def index
    
  end

  private
  def comment_params
    params.permit[:comment]
  end

end
