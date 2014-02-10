require 'spec_helper'

describe EventSourcesController do
  describe "#primary" do
    it "should fetch a message" do
      get :primary

      response.stream.close
      assigns(:waiter).join

      until assigns(:closed) #assigns(:ensure_mutex).locked?
        Thread.pass
        sleep 1
      end

      assigns(:ensure_mutex).should_not be_locked
      assigns(:subscribed).should be_true
      assigns(:left_controller).should be_true
      assigns(:closed).should be_true

    end
  end
end
