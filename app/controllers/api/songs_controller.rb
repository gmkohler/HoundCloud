class Api::SongsController < ApplicationController
  DEFAULT_SONG_IMAGE_URL = "http://res.cloudinary.com/gmkohler/image/upload/v1444792689/pwas_tqyolh.png"

  def new
  end

  def create
    @song = Song.new(song_params)
    @song.artist_id = current_user.id
    @song.image_url ||= DEFAULT_SONG_IMAGE_URL

    if @song.save
      render :show
    else
      render json: @song.errors.full_messages, status: 422
    end
  end

  def show
    @song = Song.find(params[:id])
    render :show
  end

  def index
    # Need to work on how to filter these.  Should be handled by the ApiUtil
    render :json
  end
  private
  def song_params
    params.require[:song].permit[:title, :content_url, :image_url]
  end
end
