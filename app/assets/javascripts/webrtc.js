var webrtc_create = function() {

  var channels = {};
  var currentUserUUID = Math.round(Math.random() * 60535) + 5000;
  var eventSource = null;

  var connection = new RTCMultiConnection();

  connection.media.max(320,180);
  connection.media.min(320,180);

  connection.openSignalingChannel = function (config) {
    //TODO: research if making multiple connections makes it faster?
    if (eventSource === null) {
      eventSource = new EventSource("primary");

      eventSource.onmessage =  function(e) {
        data = JSON.parse(e.data);

        if(data.sender == currentUserUUID) {
          return;
        }

        if (channels[data.channel] && channels[data.channel].onmessage) {
          channels[data.channel].onmessage(data.message);
        };
      };
    }

    var channel = config.channel || this.channel;
    channels[channel] = config;

    if (config.onopen) {
      setTimeout(config.onopen, 1);
    }

    return {
      send: function (message) {
        request = new XMLHttpRequest();
        request.open('POST', '/store', true);
        request.setRequestHeader('Content-Type', 'application/json');

        var wrappedMessage = {
          sender: currentUserUUID,
          channel: channel,
          message: message
        };

        request.send(JSON.stringify(wrappedMessage));
      },
      channel: channel
    };
  };

  connection.onNewSession = function(session) {
    connection.join(session);
  };

  document.getElementById("join-room").onclick = function() {
    connection.connect("CHEESE");
  };

  document.getElementById("create-room").onclick = function() {
    connection.open("CHEESE");
  };
};