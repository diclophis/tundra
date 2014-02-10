require 'spec_helper'

describe EventSourcesController do
  describe "#primary" do
    it "should fetch a message" do
      get :primary

      response.stream.close

      until assigns(:closed_response_stream)
        Thread.pass
      end

      assigns(:subscribed).should be_true
      assigns(:left_controller).should be_true
      assigns(:heartbeat_finished).should be_true
      assigns(:heartbeat_started).should be_true
      assigns(:closed_response_stream).should be_true
    end
  end
end
