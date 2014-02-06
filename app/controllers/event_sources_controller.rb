#Thread.abort_on_exception = true
#$stdout.sync = true

$DEBUG = true

class EventSourcesController < ApplicationController
  include ActionController::Live

  def index
  end

  def primary
    @closed = false
    @last_message = nil
    @source = nil

    response.headers['Content-Type'] = 'text/event-stream'
    response.stream.write("data: connected A\n\n")

    @source = ZmqSource.new

    response.stream.write("data: connected B\n\n")

    @source.obtain_message do |last_message|
      @last_message = last_message
      response.stream.write("data: #{@last_message}\n\n")
    end


  ensure
    @source.close if @source
    @source = nil

    response.stream.close unless response.stream.closed?

    @closed = true
  end
end
