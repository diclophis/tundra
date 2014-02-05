class ZmqDestination
  def initialize
    link = "udp://127.0.0.1:5555"
    ctx = ZMQ::Context.new
    s1 = ctx.socket(ZMQ::PUB)

    identity = "publisher-A"
    #topic = "broadcast"
    #payload = "Animal crackers!"

    s1.setsockopt(ZMQ::IDENTITY, identity)
    s1.setsockopt(ZMQ::LINGER, 100)

    s1.bind(link)

    #s1.send_string(topic, ZMQ::SNDMORE)
    #s1.send_string(payload, ZMQ::SNDMORE)
    puts s1.send_string(s1.identity)
    puts s1.close
    puts ctx.terminate
    puts

    sleep 0.1
  end
end
