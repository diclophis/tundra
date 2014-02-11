var webrtc_create = function() {

  var videos = document.getElementById("videos");
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

  connection.onstream = function(e) {
    var reflection = document.getElementById("first-video").cloneNode(true);
    reflection.id = null;
    if (e && e.mediaElement) {
      e.mediaElement.removeAttribute("controls");
      reflection.getElementsByClassName("video-container")[0].appendChild(e.mediaElement)
    }
    videos.appendChild(reflection);
    videos.className = "videos-" + (videos.getElementsByClassName("video-container").length - 1);
  };

  document.getElementById("join-room").onclick = function() {
    connection.connect("CHEESE");
  };

  document.getElementById("create-room").onclick = function() {
    connection.open("CHEESE");
  };

  document.getElementById("fake-room").onclick = function() {
    connection.onstream();
  };
};