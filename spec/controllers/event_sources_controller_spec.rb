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
      ZmqSource.should be_a(Class)

      get :primary

      Thread.new do
        s = ZmqSource.new

        5.times do
          s.store_message("hello world")
          sleep 1 #TODO: wtf!!?
          puts "wtf"
        end
        s.close
      end

      Thread.list.each do |pt|
        pt.join unless pt == Thread.current
      end

      assigns(:closed).should be_true
      assigns(:last_message).should == "hello world"
      assigns(:source).should be_nil
    end
  end
end
