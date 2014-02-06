$redis = Redis.new

heartbeat_thread = Thread.new do
  while true
    $redis.publish("primary", "thump")
    sleep 5.seconds
  end
end

at_exit do
  # not sure this is needed, but just in case
  heartbeat_thread.kill
  $redis.quit
end