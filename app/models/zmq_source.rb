class ZmqSource < BaseSource
  attr_accessor :id
  attr_accessor :zmq_context
  attr_accessor :zmq_addr
  attr_accessor :zmq_socket

  def initialize
    self.id = rand.to_s
    self.zmq_addr = 'udp://127.0.0.1:5555'
    self.zmq_context = ZMQ::Context.new
    if self.zmq_context
      self.zmq_socket = self.zmq_context.socket(ZMQ::SUB)
      if self.zmq_socket
        # http://api.zeromq.org/3-2:zmq-setsockopt
        #self.zmq_socket.setsockopt(ZMQ::LINGER, 100)
        self.zmq_socket.setsockopt(ZMQ::RCVTIMEO, 1000)
        self.zmq_socket.setsockopt(ZMQ::IDENTITY, self.id)
        self.zmq_socket.setsockopt(ZMQ::SUBSCRIBE, "")
        raise "not connected" unless 0 == self.zmq_socket.connect(self.zmq_addr)
      end
    end
  end

  def obtain_message
    message = ""
    rc = self.zmq_socket.recv_string(message) #, ZMQ::DONTWAIT)
    puts rc
    puts message
    return nil if rc == -1
    return message
  end

  def close
    if self.zmq_socket
      self.zmq_socket.close
      self.zmq_socket = nil
    end

    if self.zmq_context
      self.zmq_context.terminate
      self.zmq_context = nil
    end
  end
end
