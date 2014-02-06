class EventSourcesController < ApplicationController
  include ActionController::Live

  def index
  end

  def primary
    response.headers['Content-Type'] = 'text/event-stream'
    response.stream.write("data: connected A\n\n")
    response.stream.write("data: connected B\n\n")
    response.stream.write("data: connected C\n\n")
  ensure
    response.stream.close unless response.stream.closed?
    @closed = true
  end
end
