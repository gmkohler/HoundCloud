class Api::LikesController < ApplicationController
  def create
    klass = params[:type].constantize
    name = params[:type].underscore
    instance_variable_set("@#{name}", klass.find(params["#{name}_id"]))
    instance_variable_get("@#{name}").likers << current_user
    instance_variable_get("@#{name}").save
    render "/api/#{name}s/show"
  end

  def destroy
    klass = params[:type].constantize
    name = params[:type].underscore
    instance_variable_set("@#{name}", klass.find(params["#{name}_id"]))
    instance_variable_get("@#{name}").likers.delete(current_user)
    instance_variable_get("@#{name}").save
    render "/api/#{name}s/show"
  end
end
