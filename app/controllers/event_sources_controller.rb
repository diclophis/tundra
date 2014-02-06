Thread.abort_on_exception = true

$DEBUG = true

class EventSourcesController < ApplicationController
  include ActionController::Live
  include TundraPlane

  before_filter :handle_errors

  def index
    as_message { params[:message] }
  end

  def primary
    begin
      #Thread.new do
        response.headers['Content-Type'] = 'text/event-stream'
        each_event do |event|
          response.stream.write("data: #{event}\n\n")
        end
      #end

      #Thread.new do
      #  loop do
      #    sleep 1
      #    puts "w"
      #  end
      #end.join
    ensure
      #puts @redis.inspect
      closed
    end
  end

  def closed
    response.stream.close unless response.stream.closed?
    @closed = true
  end

  def handle_errors
    #response.stream.on_error do
    #  closed
    #end
  end
end
