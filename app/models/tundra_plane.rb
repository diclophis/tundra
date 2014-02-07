module TundraPlane
  def each_event
    yield '{"connected":"connected"}'

    #Thread.new do
    #redis = Redic.new

    #puts redis.call("SUBSCRIBE", "primary")

    #loop do
    #  msg = redis.client.read
    #  yield msg[2]
    #  #sleep 1
    #end
    #end.join

    #redis.commit

    return nil
  end

  def as_message(&block)

    redis = Redic.new
    puts redis.call("PUBLISH", "primary", block.call.to_json)
    redis.commit

  end
end