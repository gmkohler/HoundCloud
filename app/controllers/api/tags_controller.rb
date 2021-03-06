class Api::TagsController < ApplicationController
  def index
  end

  def show
  end

  def new
    @tag = Tag.new
    render :new
  end

  def create
    @tag = Tag.new(tag_params)

    if @tag.save
      render :show
    else
      render @tag.errors.full_messages, status: 422
    end
  end

  def destroy
    @tag = Tag.find(params[:id])
  end

  private
  def tag_params
    params.require[:tag].permit[:name]
  end
end
