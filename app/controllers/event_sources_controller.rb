#Thread.abort_on_exception = true

#$DEBUG = true

class EventSourcesController < ApplicationController
  include ActionController::Live
  include TundraPlane

  def primary
    response.headers['Content-Type'] = 'text/event-stream'
    response.stream.on_error do
      closed
    end
    @stream = each_event do |event|
      response.stream.write("data: #{event}\n\n")
    end
  ensure
    closed
  end

  def closed
    @stream.quit
    response.stream.close unless response.stream.closed?
    @closed = true
  end

  def handle_errors

  end
end