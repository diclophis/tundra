class WelcomeController < ApplicationController
  include TundraPlane

  def index
    #as_message { params[:message] } if params[:message].present?
    #render :index
  end
end