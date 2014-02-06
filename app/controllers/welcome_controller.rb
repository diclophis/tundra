class WelcomeController < ApplicationController
  include TundraPlane

  def index
    #render :index
  end

  def store
    as_message do
      params[:message]
    end

    render :text => params[:message]
  end
end