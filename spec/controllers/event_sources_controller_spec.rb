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

s = ZmqSource.new
puts s.store_message("hello world")
s.close
s = nil

      get :primary

=begin
      Thread.new do
        12.times do #TODO: figure out synch send
        s = ZmqSource.new

puts response.status

#puts response.inspect
#puts response.headers.inspect

          puts s.store_message("hello world")
          sleep 1
        s.close
        s = nil
        end
        response.stream.close
      end
=end


puts "wtf!!!"

response.stream.close

      Thread.list.each do |pt|
        pt.join unless pt == Thread.current
      end

      assigns(:closed).should be_true
      assigns(:last_message).should == "hello world"
      assigns(:source).should be_nil
    end
  end
end
