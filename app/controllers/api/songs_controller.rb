class Api::SongsController < ApplicationController

  def new
  end

  def create
    @song = Song.new(song_params)
    @song.artist_id = current_user.id

    if @song.save
      render :show
    else
      render json: @song.errors.full_messages, status: 422
    end
  end

  def show
    @song = Song.includes(:image).find(1)
    @song_image = @song.image
    render :show
  end

  def index
    # Need to work on how to filter these.  Should be handled by the ApiUtil
    render :json
  end
  private
  def song_params
    params.require[:song].permit[:title]
  end
end
