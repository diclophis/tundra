window.addEventListener("load", function() {
    var channels = {};
    var currentUserUUID = Math.round(Math.random() * 60535) + 5000;
    var eventSource = new EventSource("primary");

    eventSource.onmessage =  function(e) {
        console.log(e);

        data = JSON.parse(e.data);

        if(data.sender == currentUserUUID) {
            console.log("is mee");
            return;
        }

        if (channels[data.channel] && channels[data.channel].onmessage) {
            channels[data.channel].onmessage(data.message);
        };
    };

    var connection = new RTCMultiConnection();

    var iceServers = [];
    iceServers.push({
        url: "stun:stun.l.google.com:19302"
    });

    connection.iceServers = iceServers;
    connection.sdpConstraints.mandatory = {};

    connection.openSignalingChannel = function (config) {
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
        console.log("!!!!!!", session);
        connection.join(session);
    };

    document.getElementById("join-room").onclick = function() {
        connection.connect("CHEESE");
    };

    document.getElementById("create-room").onclick = function() {
        connection.open("CHEESE");
    };
});