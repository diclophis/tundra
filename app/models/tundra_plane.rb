module TundraPlane
  def each_event
    yield '{"connected":"connected"}'

    redis = Redic.new

    puts redis.call("SUBSCRIBE", "primary")

    loop do
      msg = redis.client.read
      yield msg[2]
      sleep 1
    end

    return redis
  end

  def as_message(&block)
    #if Rails.env.test?
    #  #return block.call
    #end

    #Fiber.new do
      redis = Redic.new
      puts redis.call("PUBLISH", "primary", block.call.to_json)
      redis.commit
    #end
  end
end