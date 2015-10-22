class Api::SongsController < ApplicationController
  DEFAULT_SONG_IMAGE_URL = "http://res.cloudinary.com/gmkohler/image/upload/v1444792689/pwas_tqyolh.png"

  def create
    current_user
    @song = Song.new(song_params)
    @song.assign_tags(params[:song][:tag_names])
    @song.artist_id = current_user.id
    @song.image_url ||= current_user.image_url

    if @song.save
      render :show
    else
      render json: @song.errors.full_messages, status: 422
    end
  end

  def show
    @song = Song.includes(:artist).find(params[:id])
    render :show
  end

  def index
    @songs = Song.filter({context: params[:context], context_data: params[:context_data]})
    render :index
  end

  def update
    @song = Song.find(params[:id])
    @song.update(song_params)
    @song.tags = []
    @song.assign_tags(params[:song][:tag_names])

    if @song.save
      render :show
    else
      render json: @song.errors.full_messages, status: 422
    end
  end

  private
  def song_params
    params.require(:song).permit(:title, :content_url, :image_url)
  end
end
