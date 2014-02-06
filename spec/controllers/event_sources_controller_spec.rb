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
      puts "start spec"

      ZmqSource.should be_a(Class)

      get :primary

      Thread.new do
        #sleep 5
        s = ZmqSource.new
        sleep 1
        2.times do
          s.store_message("hello world")
          #sleep 5
          #Thread.pass
          sleep 1
        end
      end


      Thread.list.each do |pt|
        pt.join unless pt == Thread.current
      end

      assigns(:closed).should be_true
    end
  end
end
