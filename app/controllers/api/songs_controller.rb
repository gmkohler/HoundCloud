class Api::SongsController < ApplicationController
  def show
    @song = Song.includes(:image).find(1)
    render json: @song.image
  end
end
