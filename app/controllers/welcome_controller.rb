class WelcomeController < ApplicationController
  def index
    #render :index
  end

  def store
    @redis = Redis.new
    @redis.publish("broadcast", params[:message])
    @redis.quit

    render :layout => false
  end
end