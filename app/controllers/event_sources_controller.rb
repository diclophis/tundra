Thread.abort_on_exception = true
$stdout.sync = true

class EventSourcesController < ApplicationController
  include ActionController::Live

  def index
  end

  def primary
    #source = nil

    #response.stream.on_error do |*args|
    #  logger.fatal "on_error"
    #  logger.fatal(args)
    #end

    source = nil

    #begin
    #  foo = Thread.new {
    #    1.times {
    #      response.stream.write("data: beep-boop\n\n")
    #      sleep 0.1
    #    }
    #  }
    #  foo.join
    #ensure
    #  response.stream.close
    #end

    #begin
      #response.stream.write("data: connected\n\n")

      puts "live update"
      response.headers['Content-Type'] = 'text/event-stream'
      response.stream.write("data: connected A\n\n")

      #subscriber_thread = Thread.new do
        begin
          source = ZmqSource.new

          puts "live update"
          #response.headers['Content-Type'] = 'text/event-stream'
          response.stream.write("data: connected B\n\n")

        #begin
        #  puts "source"
        #  puts source = ZmqSource.new
        #  puts
        #
        #2.times do
        loop do
          #Thread.pass

          puts "message--2"
          puts message = source.obtain_message
          puts

          if message
            puts "live out"
            puts response.stream.write("data: #{message}\n\n")
            puts
          end

        #  sleep 0.1
        end
      #
      #    puts "done"
      #    puts
        #rescue IOError => io_error
        #  puts "IOError inner"
        #  puts io_error
        #  puts
        #ensure

      #end
      #
      #  puts "idle looping in thread"
      #  subscriber_thread.join
        rescue => e
          puts "WEWEWEWEWEW"
          puts e
        ensure
          if source
            puts "ensure linkage close"
            #puts source.inspect
            puts source.close
            puts
          end


        end
      #end

      #subscriber_thread.join
  ensure
    puts "outer ensure"
    puts response.stream.close
    #puts
    #rescue IOError => io_error
    #  puts "IOError outer"
    #  puts io_error
    #  puts

  end
end