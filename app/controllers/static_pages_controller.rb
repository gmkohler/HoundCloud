class StaticPagesController < ApplicationController
  before_filter :require_login!
  def root
    render :root
  end
end
