class Linkage
  include Celluloid::ZMQ

  attr_accessor :pub
  attr_accessor :sub
  attr_accessor :link

  def initialize

    self.link = "tcp://127.0.0.1:5555"

    #self.sub.subscribe('') # receive all
  end

  def send_fart
    self.pub = PushSocket.new
    self.pub.linger = 100
    self.pub.connect(self.link)
    #topic = "animals.dog"
    payload = "Animal crackers!"

    #self.pub.identity = "publisher-A"
    puts "sending"
    # use the new multi-part messaging support to
    # automatically separate the topic from the body
    #self.pub.write(topic, payload, self.pub.identity)
    puts self.pub.send(payload)
    puts self.pub.close
    self.pub = nil
  end

  def handle_message_fart(message)
    puts "mes #{message}"
  end

  def listen_fart
    self.sub = PullSocket.new
    self.sub.bind(self.link)

    #async.handle_message_fart self.sub.read 

    puts "listen"
    #puts ZMQ.evented?
    puts message = self.sub.read
=begin
    topic = ''
    self.sub.read(topic)

    body = ''
    self.sub.read(body) if self.sub.more_parts?

    identity = ''
    self.sub.read(identity) if self.sub.more_parts?
    puts "received topic [#{topic}], body [#{body}], identity [#{identity}]"

=end
    puts self.sub.close
    self.sub = nil
    message
  end

  def halt
    self.pub.close if self.pub
    self.sub.close if self.sub

    self.pub = nil
    self.sub = nil
  end
end
