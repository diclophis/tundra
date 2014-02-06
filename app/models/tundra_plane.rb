
class RetryRedisSub < StandardError
end

class Redis
  module Connection
    module SocketMixin
      def _read_from_socket(nbytes)
        begin
          read_nonblock(nbytes)

        rescue Errno::EWOULDBLOCK, Errno::EAGAIN
          if IO.select([self], nil, nil, @timeout)
            #retry
            raise RetryRedisSub.new
          else
            raise Redis::TimeoutError
          end
        end
      rescue EOFError
        raise Errno::ECONNRESET
      end
    end
  end
end

module TundraPlane
  def each_event
    #yield "connected"

    if Rails.env.test?
      return
    end

    redis = Redis.new :timeout => 1
    redis.subscribe('primary') do |on|
      on.message do |event, data|
        yield data
      end
    end

    return redis
  end

  def as_message(&block)
    if Rails.env.test?
      return block.call
    end

    redis = Redis.new
    redis.publish("primary", block.call.to_json)
  end
end
