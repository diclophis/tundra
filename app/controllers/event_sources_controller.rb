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
    response.stream.write("data: connected B\n\n")

    @source = ZmqSource.new

    loop do
      next_message = @source.obtain_message
      if next_message
        @last_message = next_message
        #response.stream.write("data: #{@last_message}\n\n")
      else
        response.stream.write("data: timedout A\n\n")
        if response.stream.closed?
          break
        else
          puts "reloop"
          redo
        end
      end
    end
  ensure
    @source.close if @source
    @source = nil

    response.stream.close unless response.stream.closed?

    @closed = true
  end
end
