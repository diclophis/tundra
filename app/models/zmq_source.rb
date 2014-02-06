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
    #self.zmq_addr = "ipc:///tmp/feeds/0"
    #self.zmq_addr = "pgm://*:5555"
    #puts "context"
    puts self.zmq_context = ZMQ::Context.create #ZMQ::Context.new(16) #({:io_threads => 16, :max_sockets => 16})
    #puts

    self
  end

  def store_message(msg)
    if self.zmq_context
      unless self.zmq_sender
        # Socket to send messages to
        self.zmq_sender = self.zmq_context.socket(ZMQ::PUB)
        raise unless ::ZMQ::Util.resultcode_ok? self.zmq_sender.setsockopt(ZMQ::SNDTIMEO, 30000)
        raise unless ::ZMQ::Util.resultcode_ok? self.zmq_sender.setsockopt(ZMQ::SNDHWM, 1)

        #self.zmq_sender.bind("tcp://*:5558")
        self.zmq_sender.bind(self.zmq_addr)
      end

      puts "sending..."

      unless ::ZMQ::Util.resultcode_ok? self.zmq_sender.send_string(msg)
        puts "failed to send #{msg}"
      end
    end
  end

  def obtain_message
    unless self.zmq_poller && self.zmq_controller
      # Socket for control input
      self.zmq_controller = self.zmq_context.socket(ZMQ::SUB)
      #self.zmq_controller.connect("tcp://localhost:5558")
      self.zmq_controller.connect(self.zmq_addr)
      self.zmq_controller.setsockopt(ZMQ::SUBSCRIBE, "")

      # Process messages from receiver and controller
      self.zmq_poller = ZMQ::Poller.new()
      #self.zmq_poller.register(self.zmq_receiver,ZMQ::POLLIN)
      self.zmq_poller.register(self.zmq_controller,ZMQ::POLLIN)
    end

    #message = ""
    #
    puts "recving..."
    #
    #
    ##loop do
    #  unless ::ZMQ::Util.resultcode_ok? self.zmq_socket.recv_string(message, ZMQ::DONTWAIT)
    #    puts "error receiving ZMQ string: " + ::ZMQ::Util.error_string
    #  end
    ##end
    #
    #puts "message --"
    #puts message
    #puts
    #
    #return message
    #while true

    #max_empty = 32
    #empty_counter = 0

    #loop do
      items = self.zmq_poller.poll 30000

      puts "message count"
      puts items.inspect
      puts

      if items > 0
        empty_counter = 0
        self.zmq_poller.readables.each do |item|
          if item === self.zmq_controller
            self.zmq_controller.recv_string(msg = "")
            return msg
          end
        end
      #else
      #  empty_counter += 1
      #  break if empty_counter > max_empty
      end
    #end
  end

  def close
    puts "closing linkage"

    if self.zmq_sender
      self.zmq_sender.close
      self.zmq_sender = nil
    end

    if self.zmq_receiver
      self.zmq_receiver.close
      self.zmq_receiver = nil
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
