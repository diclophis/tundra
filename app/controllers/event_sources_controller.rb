#Thread.abort_on_exception = true
#$stdout.sync = true

$DEBUG = true

class EventSourcesController < ApplicationController
  include ActionController::Live

  attr_accessor :source

  def index
  end

  def primary
      @closed = false
    #begin

      puts "live update 111"
      response.headers['Content-Type'] = 'text/event-stream'
      response.stream.write("data: connected A\n\n")

      puts "WTF!!!"

      #begin
        self.source = ZmqSource.new

        puts "live update 222"

        response.stream.write("data: connected B\n\n")

        puts "message--2"

        puts message = source.obtain_message
        puts

        #if message
        #  puts "live out"
        #  puts response.stream.write("data: #{message}\n\n")
        #  puts
        #end
        #sleep 5
      #rescue => e
      #  puts "WEWEWEWEWEW"
      #  puts e
      #ensure
      #  if source
      #    puts "ensure linkage close"
      #    puts source.close
      #    puts
      #  end
      #end

      Thread.pass

      puts "outer ensure"
      puts response.stream.close unless response.stream.closed?

      @closed = true
    #rescue => e
    #  puts "WTF222"
    #  puts e
    #end
  end
end
