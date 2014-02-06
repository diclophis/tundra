require 'spec_helper'

describe EventSourcesController do
  describe "#primary" do
    it "should fetch a message" do
      get :primary
      #assigns(:sync_thread).join
      #response.stream.close
      #assigns(:thread).join
      sleep 5
      assigns(:closed).should be_true
    end
  end
end