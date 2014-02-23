window.skipRTCMultiConnectionLogs = true;

var webrtc_create = function() {

  var videos = document.getElementById("videos");
  var channels = {};
  var currentUserUUID = Math.round(Math.random() * 60535) + 5000;
  var eventSource = null;
  var buttons = document.getElementById("buttons");

  var connection = new RTCMultiConnection();
  connection.direction = "one-to-many";

  connection.bandwidth = {
    audio: 32,
    video: 256
  };

  var isBroadcasting = false;

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
    if (!isBroadcasting) {
      session.session.video = false;
      session.session.audio = false; 
      session.session.broadcast = false;
      session.session.oneway = true;
    }
    connection.join(session);
  };

  connection.onstream = function(e) {
    if (e.userid != currentUserUUID) {
    var reflection = document.getElementById("first-video").cloneNode(true);
    reflection.id = null;
    if (e && e.mediaElement) {
      e.mediaElement.removeAttribute("controls");
      reflection.getElementsByClassName("video-container")[0].appendChild(e.mediaElement)
    }
    videos.appendChild(reflection);
    videos.className = "videos-" + (videos.getElementsByClassName("video-container").length - 1);
    reflection.onclick = function() {
      var request = new XMLHttpRequest();
      request.open("POST", "/coin");
      request.send();
    };
    }
  };

  if (buttons) {
  document.getElementById("join-room").onclick = function() {
    connection.session = {
       audio:  false,
       video:  false,
    };
    connection.connect("CHEESE");
  };

  document.getElementById("create-room").onclick = function() {
    isBroadcasting = true;
    connection.session = {
      audio:  true,
      video:  true,
    };
    //connection.media.max(640, 480); //180);
    //connection.media.max(1920,1080);
    //connection.media.min(640, 480);
    connection.open("CHEESE");
    buttons.style.display = "none";
  };

  document.getElementById("fake-room").onclick = function() {
    connection.onstream();
  };
  } else {
setTimeout(function() {
    connection.session = {
       audio:  false,
       video:  false,
    };
    connection.connect("CHEESE");
}, 2000);
  }
};
