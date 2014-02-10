Thread.abort_on_exception = true

class EventSourcesController < ApplicationController
  include ActionController::Live

  def primary
    @subscribed = false
    @closed = false
    @sse_mutex = Mutex.new
    @ensure_mutex = Mutex.new
    @ensure_mutex.lock

    @waiter = Thread.new do
      while @ensure_mutex.locked?
        puts "w"
        sleep 1
      end
    end

    @redis = Redis.new
    @redis2 = Redis.new

    @uid = (rand * 10000).to_i.to_s

    response.headers['Content-Type'] = 'text/event-stream'
    sse = SSE.new(response.stream) #, retry: 300, event: "event-name")

    @subscriber = Thread.new do
      begin
        @heartbeat = Thread.new do
          until (bar = @redis2.publish(@uid, "heartbeat")) == 1
            Thread.pass
            sleep 1
          end

          while (bar = @redis2.publish(@uid, "heartbeat")) == 1
            Thread.pass
            sleep 1
          end

          puts "w???? #{bar} #{bar.class}"
        end

        @subscribed = true

        @redis.subscribe(['broadcast', @uid]) do |on|
          on.message do |event, data|
            if response.stream.closed?
              puts "bar"
              @redis.unsubscribe(["broadcast", @uid])
            else
              if event == @uid
                puts "foor"
                @sse_mutex.lock unless @sse_mutex.locked?
              end
              sse.write({ name: data})
              sleep 1
            end
          end
        end

        closed
      rescue IOError => e
        puts e
        closed
      end
    end

    Thread.new do
      until @sse_mutex.locked?
        Thread.pass
        sleep 1
      end
    end.join

    puts @ensure_mutex.locked?
    @left_controller = true
  end

  def closed
    @heartbeat.join

    @redis.quit if @redis && @redis.connected?
    @redis2.quit if @redis2 && @redis2.connected?
    response.stream.close unless response.stream.closed?
    @closed = true
    @ensure_mutex.unlock if @ensure_mutex.locked?
    puts "wtf"
  end
end