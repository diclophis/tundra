Thread.abort_on_exception = true

class EventSourcesController < ApplicationController
  include ActionController::Live

  def primary
    @subscribed = false
    @closed = false
    @heartbeat_started = false
    @heartbeat_finished = false
    @sse_mutex = Mutex.new
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

          @heartbeat_finished = true
        end

        @subscribed = true

        @redis.subscribe(['broadcast', @uid]) do |on|
          on.message do |event, data|
            if response.stream.closed?
              @redis.unsubscribe(["broadcast", @uid])
            else
              if event == @uid
                @heartbeat_started = true
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

    @left_controller = true
  end

  def closed
    @heartbeat.join
    @redis.quit if @redis && @redis.connected?
    @redis2.quit if @redis2 && @redis2.connected?
    response.stream.close unless response.stream.closed?
    @closed = true
  end
end