module TundraPlane
  def each_event
    yield "connected"

    #if Rails.env.test?
    #  #return
    #end

    redis = Redis.new :timeout => 1

    redis.subscribe('primary') do |on|
      on.message do |event, data|
        yield data
      end
    end

    return redis
  end

  def as_message(&block)
    #if Rails.env.test?
    #  #return block.call
    #end

    redis = Redis.new
    redis.publish("primary", block.call.to_json)
  end
end
