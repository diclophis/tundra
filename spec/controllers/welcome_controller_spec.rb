require 'spec_helper'

describe WelcomeController do
  describe "#index" do
    it "should have an :index resource that renders a template" do
      get :index
      response.should render_template("index")
    end

  end

  describe "#store" do #TODO: figure out how to spec this
    it "should send message" do
      post :store
      response.should be_success

      post :store, :message => "bar"
      response.should be_success
    end
  end
end