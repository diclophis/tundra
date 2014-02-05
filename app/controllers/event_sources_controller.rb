class EventSourcesController < ApplicationController
  include ActionController::Live

  def index
  end

  def primary
    source = nil

    response.stream.on_error do |*args|
      logger.fatal "on_error"
      logger.fatal(args)
    end

    response.headers['Content-Type'] = 'text/event-stream'

    begin
      foo = Thread.new {
        10.times {
          response.stream.write("data: beep-boop\n\n")
          sleep 0.1
        }
      }
      foo.join
    ensure
      response.stream.close
    end

=begin
    linkage = Linkage.new

    begin
      puts "linking"
      puts message = linkage.listen_fart
      response.stream.write("message:#{message}\n\n")
    rescue IOError => e
      puts "IOError"
      puts e
      puts
    ensure
      puts "ensure"
      puts linkage.halt
      puts response.stream.close
      puts
    end
=end

=begin
    #begin
      response.headers['Content-Type'] = 'text/event-stream'
      source = ZmqSource.new
      10.times do
        if message = source.obtain_message
          response.stream.write("message:#{message}\n\n")
        end
      end
    #rescue IOError => e
    #  logger.fatal "IOError"
    #  logger.fatal(e.backtrace) unless e.message.include?("closed stream")
    #ensure
    #  logger.fatal "ensure"
      source.close
      response.stream.close
    #end
=end

  end
end
