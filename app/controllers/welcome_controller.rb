class WelcomeController < ApplicationController
  def index
    #render :index
  end

  def store
    @redis = Redis.new
    @redis.publish("broadcast", params[:welcome].to_json)
    @redis.quit

    render :layout => false
  end

  def coin
    render :text => `curl http://localhost:3000 2>&1`
  end
end
