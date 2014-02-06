module TundraPlane
  def each_event
    yield '{"connected":"connected"}'

    #if Rails.env.test?
    #  #return
    #end
    puts "wtf"

    redis = Redic.new #:timeout => 1

    #Fiber.new do
      puts redis.call("SUBSCRIBE", "primary")

      loop do
        msg = redis.client.read
        yield msg[2]
        sleep 1
      end
       #do |on|
       # on.message do |event, data|
       #   yield data
       # end
      #end
    #end

    return redis
  end

  def as_message(&block)
    #if Rails.env.test?
    #  #return block.call
    #end

    #Fiber.new do
      redis = Redic.new
      redis.call("PUBLISH", "primary", block.call.to_json)
    #end
  end
end