#Thread.abort_on_exception = true

#$DEBUG = true

class EventSourcesController < ApplicationController
  include ActionController::Live
  include TundraPlane

  def primary
    #@client_thread = Thread.new do
    #  until response.stream.closed?
    #    puts "."
    #    response.stream.write("data: naught\n\n")
    #    sleep 1
    #  end
    #
    #  @thread.kill
    #end
    #
    #@sync_thread = Thread.new do
    #  until @thread
    #    sleep 1
    #  end
    #end

    #begin
      response.headers['Content-Type'] = 'text/event-stream'
      response.stream.on_error do
        closed
      end
      @redis, @thread = each_event do |event|
        response.stream.write("data: #{event}\n\n")
      end

      #@client_thread.join
      #@thread.join
  ensure
    closed
    #@thread.kill
  end
  #end

  def closed
    response.stream.close unless response.stream.closed?
    @closed = true
  end

  def handle_errors

  end
end