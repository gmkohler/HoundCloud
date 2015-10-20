class Api::SongsController < ApplicationController
  DEFAULT_SONG_IMAGE_URL = "http://res.cloudinary.com/gmkohler/image/upload/v1444792689/pwas_tqyolh.png"

  def create
    current_user
    @song = Song.new(song_params)
    @song.artist_id = current_user.id
    @song.image_url ||= current_user.image_url

    if @song.save
      render json: {id: @song.id}
    else
      render json: @song.errors.full_messages, status: 422
    end
  end

  def show
    @song = Song.includes(:artist).find(params[:id])
    render :show
  end

  def index
    @songs = Song.filter({id: params[:id], home: params[:home]})
    render :index
  end

  private
  def song_params
    params.require(:song).permit(:title, :content_url, :image_url)
  end
end
