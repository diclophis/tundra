require 'spec_helper'

describe EventSourcesController do
  describe "#index" do
    it "should have an :index resource that renders a template" do
      get :index
      response.should render_template("index")
    end
  end

  describe "#primary" do
    it "should fetch a message" do
      s = ZmqSource.new
      s.store_message("hello world")
      get :primary
      sleep 1

      s.store_message("hello world")
      s.store_message("hello world")
      s.store_message("hello world")
      s.store_message("hello world")
      s.store_message("hello world")

      #sleep 10
    end
  end
end