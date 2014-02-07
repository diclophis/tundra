require 'spec_helper'

describe EventSourcesController do
  describe "#primary" do
    it "should fetch a message" do
      get :primary
      assigns(:closed).should be_true
    end
  end
end