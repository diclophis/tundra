class ZmqSource < BaseSource
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
    #puts "context"
    puts self.zmq_context = ZMQ::Context.new(1) #{:io_threads => 0, :max_sockets => 16})
    puts

    if self.zmq_context
    #  puts "socket"
    #  puts self.zmq_socket = self.zmq_context.socket(ZMQ::SUB)
    #  puts
    #
    #  if self.zmq_socket
    #    puts "setting sock opts"
    #    # http://api.zeromq.org/3-2:zmq-setsockopt
    #    #puts self.zmq_socket.setsockopt(ZMQ::LINGER, 1)
    #    #self.zmq_socket.setsockopt(ZMQ::RCVTIMEO, 0)
    #    #self.zmq_socket.setsockopt(ZMQ::IDENTITY, self.id)
    #    puts self.zmq_socket.setsockopt(ZMQ::SUBSCRIBE, "")
    #    #raise "not connected" unless 0 == self.zmq_socket.bind(self.zmq_addr)
    #    unless ::ZMQ::Util.resultcode_ok? self.zmq_socket.connect(self.zmq_addr)
    #      raise IOError, "error connecting ZMQ string: " + ::ZMQ::Util.error_string
    #    end
    #  end


    # Socket to receive messages on
      #self.zmq_receiver = self.zmq_context.socket(ZMQ::PULL)
      #self.zmq_receiver.connect("tcp://localhost:5557")

      # Socket to send messages to
      self.zmq_sender = self.zmq_context.socket(ZMQ::PUB)
      self.zmq_sender.bind("tcp://*:5558")

      # Socket for control input
      self.zmq_controller = self.zmq_context.socket(ZMQ::SUB)
      self.zmq_controller.connect("tcp://localhost:5558")
      self.zmq_controller.setsockopt(ZMQ::SUBSCRIBE,"")

      # Process messages from receiver and controller
      self.zmq_poller = ZMQ::Poller.new()
      #self.zmq_poller.register(self.zmq_receiver,ZMQ::POLLIN)
      self.zmq_poller.register(self.zmq_controller,ZMQ::POLLIN)
    end

    self
  end

  def store_message(msg)
    puts "sending..."
    unless ::ZMQ::Util.resultcode_ok? self.zmq_sender.send_string(msg)
      puts "failed to send #{msg}"
    end

    puts

    sleep 1
  end

  def obtain_message
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

    #loop do
      items = self.zmq_poller.poll

      puts "message count"
      puts items.inspect
      puts

      self.zmq_poller.readables.each do |item|
        if item === self.zmq_controller
          puts "waiting for something"

          self.zmq_controller.recv_string(msg = "")

          puts "gots"
          puts msg

          ## Simple progress indicator for the viewer
          #$stdout << "#{msec}."
          #$stdout.flush

          ## Do the work
          #sleep(msec.to_f / 1000)

          # Send results to sink
          #sender.send_string("")

          return msg
        end

        #break if item === self.zmq_controller
      end
    #end

    nil
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