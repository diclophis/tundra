class ZmqSource
  attr_accessor :id
  attr_accessor :zmq_context
  attr_accessor :zmq_addr
  attr_accessor :zmq_socket
  attr_accessor :zmq_receiver
  attr_accessor :zmq_controller
  attr_accessor :zmq_poller
  attr_accessor :zmq_sender

  def initialize
    self.id = rand.to_s
    self.zmq_addr = "tcp://127.0.0.1:5555"
  end

  def store_message(msg)
    unless self.zmq_context
      self.zmq_context = ZMQ::Context.create #ZMQ::Context.new(16) #({:io_threads => 16, :max_sockets => 16})

      # Socket to send messages to
      self.zmq_sender = self.zmq_context.socket(ZMQ::PUB)
      #raise unless ::ZMQ::Util.resultcode_ok? self.zmq_sender.setsockopt(ZMQ::SNDTIMEO, 1000)
      #raise unless ::ZMQ::Util.resultcode_ok? self.zmq_sender.setsockopt(ZMQ::SNDHWM, 1)
      #raise unless ::ZMQ::Util.resultcode_ok? self.zmq_sender.setsockopt(ZMQ::SNDBUF, 1)
      self.zmq_sender.bind(self.zmq_addr)
    end

    return ::ZMQ::Util.resultcode_ok? self.zmq_sender.send_string(msg)
  end

  def obtain_message
    unless self.zmq_context
      self.zmq_context = ZMQ::Context.create #ZMQ::Context.new(16) #({:io_threads => 16, :max_sockets => 16})

      # Socket for control input
      self.zmq_controller = self.zmq_context.socket(ZMQ::SUB)
      self.zmq_controller.connect(self.zmq_addr)
      self.zmq_controller.setsockopt(ZMQ::SUBSCRIBE, "")
      #raise unless ::ZMQ::Util.resultcode_ok? self.zmq_controller.setsockopt(ZMQ::RCVTIMEO, 1000)
      #raise unless ::ZMQ::Util.resultcode_ok? self.zmq_controller.setsockopt(ZMQ::RCVHWM, 1)
      #raise unless ::ZMQ::Util.resultcode_ok? self.zmq_controller.setsockopt(ZMQ::RCVBUF, 1)
    end

    if ::ZMQ::Util.resultcode_ok? self.zmq_controller.recv_string(msg = "")
      puts "ZMQ::RECV -- #{msg}" if $DEBUG
      msg
    else
      puts ZMQ::Util.error_string if $DEBUG
      nil
    end
  end

  def close
    if self.zmq_sender
      self.zmq_sender.close
      self.zmq_sender = nil
    end

    if self.zmq_controller
      self.zmq_controller.close
      self.zmq_controller = nil
    end

    if self.zmq_context
      self.zmq_context.terminate
      self.zmq_context = nil
    end
  end
end
