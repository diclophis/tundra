Thread.abort_on_exception = true

class EventSourcesController < ApplicationController
  include ActionController::Live

  def primary
    @subscribed = false
    @closed_response_stream = false
    @heartbeat_started = false
    @heartbeat_finished = false
    @sse_mutex = Mutex.new
    @redis = Redis.new
    @redis2 = Redis.new
    @uid = (rand * 100000).to_i.to_s

    response.headers['Content-Type'] = 'text/event-stream'
    sse = SSE.new(response.stream)

    @subscriber = Thread.new do
      begin
        @heartbeat = Thread.new do
          until (bar = @redis2.publish(@uid, "{}")) == 1
            Thread.pass
            sleep 0.01
          end

          while (bar = @redis2.publish(@uid, "{}")) == 1
            Thread.pass
            sleep 5
          end

          @heartbeat_finished = true
        end

        @redis.subscribe(['broadcast', @uid]) do |on|
          on.message do |event, data|
            if response.stream.closed?
              @redis.unsubscribe(["broadcast", @uid])
            else
              if event == @uid
                @heartbeat_started = true
                @sse_mutex.lock unless @sse_mutex.locked?
              end
              sse.write(data)
            end
          end
          @subscribed = true
        end

        closed
      rescue IOError => e
        puts e #TODO spec this
        closed
      end
    end

    Thread.new do
      until @sse_mutex.locked?
        Thread.pass
      end
    end.join

    @left_controller = true
  end

  def closed
    @heartbeat.join
    @redis.quit if @redis && @redis.connected?
    @redis2.quit if @redis2 && @redis2.connected?
    response.stream.close unless response.stream.closed?
    @closed_response_stream = true
  end
end