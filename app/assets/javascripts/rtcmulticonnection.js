// Last time updated at 09 Feb 2014, 19:28:23

// Muaz Khan         - www.MuazKhan.com
// MIT License       - www.WebRTC-Experiment.com/licence
// Documentation     - www.RTCMultiConnection.org/docs/

// FAQ               - www.RTCMultiConnection.org/FAQ/
// Development News  - trello.com/b/8bhi1G6n/RTCMultiConnection

// v1.6 changes log  - www.RTCMultiConnection.org/changes-log/#v1.6
// _______________________
// RTCMultiConnection-v1.6

(function(){function rt(u){function ot(n){for(var i,t=0;t<u.__attachStreams.length;t++)i=u.__attachStreams[t].streamid,u.streams[i]&&(u.streams[i].socket=n);u.__attachStreams=[]}function it(r){function rt(n){n.readyState<=HTMLMediaElement.HAVE_CURRENT_DATA||n.paused||n.currentTime<=0?setTimeout(function(){rt(n)},50):ft(n)}function ft(n){var t=r.stream,i,f;t.onended=function(){u.onstreamended(i)};i={mediaElement:n,stream:t,streamid:t.streamid,session:e,blobURL:n.mozSrcObject||n.src,type:"remote",extra:r.extra,userid:r.userid};u.streams[t.streamid]=u._getStream({stream:t,userid:r.userid,streamid:t.streamid,socket:a,type:"remote",streamObject:i,mediaElement:n,rtcMultiConnection:u});u.onstream(i);ct();u.onspeaking&&(f=new l({context:u._audioContext,root:u,event:i}),f.connectToSource(t))}function at(n){r.channel=n;u.channels[r.userid]={channel:r.channel,send:function(n){u.send(n,this.channel)}};u.onopen({extra:r.extra,userid:r.userid});for(var t in u.fileQueue)u.send(u.fileQueue[t],n);s(e)&&ct()}function ht(){a.userid!=r.userid&&(a.userid=r.userid,y[r.socketIndex]=a,u.peers[r.userid]={socket:a,peer:g,userid:r.userid,addStream:function(n){u.addStream(n,this.socket)},renegotiate:function(n){u.renegotiate(n)},changeBandwidth:function(n){if(!n)throw"You MUST pass bandwidth object.";if(typeof n=="string")throw"Pass object for bandwidth instead of string; e.g. {audio:10, video:20}";this.peer.bandwidth=n;this.socket.send({userid:u.userid,extra:u.extra||{},changeBandwidth:!0,bandwidth:n})},sendCustomMessage:function(n){this.socket.send({userid:u.userid,extra:u.extra||{},customMessage:!0,message:n})},onCustomMessage:function(t){n('Received "private" message from',this.userid,typeof t=="string"?t:i(t))},drop:function(n){for(var t in u.streams)if(u._skip.indexOf(t)==-1){t=u.streams[t];t.userid==u.userid&&t.type=="local"&&this.peer.connection.removeStream(t.stream);u.onstreamended(t.streamObject)}n||this.socket.send({userid:u.userid,extra:u.extra||{},drop:!0})},hold:function(){this.peer.hold=!0;this.socket.send({userid:u.userid,extra:u.extra||{},hold:!0})},unhold:function(){this.peer.hold=!1;this.socket.send({userid:u.userid,extra:u.extra||{},unhold:!0})},fireHoldUnHoldEvents:function(n){for(var t in u.streams)if(u._skip.indexOf(t)==-1){if(t=u.streams[t],t.userid==u.userid&&t.type=="local"&&this.peer.connection.removeStream(t.stream),n&&u.onhold)u.onhold(t.streamObject);if(n&&u.onunhold)u.onunhold(t.streamObject)}}})}function ct(){u.userType&&u.direction!=="many-to-many"||!e.oneway&&!e.broadcast&&u.isInitiator&&v(p)>1&&v(p)<=u.maxParticipantsAllowed&&b.send({newParticipant:r.userid||a.channel,userid:f.userid,extra:r.extra||{}})}function vt(n){var s,i,e;if(n.userid!=u.userid){if(n.sdp&&(r.userid=n.userid,r.extra=n.extra,r.renegotiate=n.renegotiate,r.streaminfo=n.streaminfo,yt(JSON.parse(n.sdp),n.labels)),n.candidate&&g&&g.addIceCandidate({sdpMLineIndex:n.candidate.sdpMLineIndex,candidate:JSON.parse(n.candidate.candidate)}),n.mute||n.unmute)if(n.promptMuteUnmute)n.mute&&u.streams[n.streamid].mute(n.session),n.unmute&&u.streams[n.streamid].unmute(n.session);else{if(u.streams[n.streamid]&&(n.mediaElement=u.streams[n.streamid].mediaElement),n.mute)u.onmute(n);if(n.unmute)u.onunmute(n)}if(n.stopped){u.streams[n.streamid]&&(n.mediaElement=u.streams[n.streamid].mediaElement);u.onstreamended(n)}if(n.promptStreamStop&&!u.isInitiator&&o("What if initiator invoked stream.stop for remote user?"),n.left){if(t){s=n.userid;for(i in u.streams)if(i=u.streams[i],i.userid==s){c(i);i.stream.onended(i.streamObject)}}if(g&&g.connection&&(g.connection.close(),g.connection=null),n.closeEntireSession?(u.close(),u.refresh()):a&&n.ejected&&(a.send({left:!0,extra:u.extra,userid:f.userid}),y[r.socketIndex]&&delete y[r.socketIndex],d[a.channel]&&delete d[a.channel],a=null),u.remove(n.userid),p[n.userid]&&delete p[n.userid],e={userid:n.userid,extra:n.extra},n.closeEntireSession)u.onclose(e);else u.onleave(e);u.userType&&(u.busy=!1)}if(n.playRoleOfBroadcaster&&(n.extra&&(u.extra=h(u.extra,n.extra)),setTimeout(u.playRoleOfInitiator,2e3)),n.isCreateDataChannel&&t&&g.createDataChannel(),n.changeBandwidth){if(!u.peers[n.userid])throw"No such peer exists.";u.peers[n.userid].peer.bandwidth=n.bandwidth;u.peers[n.userid].renegotiate()}if(n.customMessage){if(!u.peers[n.userid])throw"No such peer exists.";u.peers[n.userid].onCustomMessage(n.message)}if(n.drop){if(!u.peers[n.userid])throw"No such peer exists.";u.peers[n.userid].drop(!0);u.peers[n.userid].renegotiate()}if(n.hold){if(!u.peers[n.userid])throw"No such peer exists.";u.peers[n.userid].peer.hold=!0;u.peers[n.userid].renegotiate()}if(n.unhold){if(!u.peers[n.userid])throw"No such peer exists.";u.peers[n.userid].peer.hold=!1;u.peers[n.userid].renegotiate()}}}function yt(t,i){function f(){g.recreateAnswer(t,e,function(n,t){ut({sdp:n,socket:a,streaminfo:t})})}if(n(t.type,t.sdp),t.type=="answer"){g.setRemoteDescription(t);ht();return}if(!r.renegotiate&&t.type=="offer"){nt.offerDescription=t;nt.session=e;g=k.create("answer",nt);ht();return}if(e=r.renegotiate,st(i,g.connection),e.oneway||s(e))f();else{if(r.capturing)return;r.capturing=!0;u.captureUserMedia(function(n){r.capturing=!1;g.connection.addStream(n);f()},r.renegotiate)}delete r.renegotiate}var it={channel:r.channel,onmessage:vt,onopen:function(n){n&&(a=n);lt&&!g&&(nt.session=e,g=k.create("offer",nt));r.socketIndex=a.index=y.length;d[it.channel]=a;y[r.socketIndex]=a;ot(a)}};it.callback=function(n){a=n;it.onopen()};var a=u.openSignalingChannel(it),lt=r.isofferer,g,nt={onopen:at,onicecandidate:function(t){if(!u.candidates)throw"ICE candidates are mandatory.";(u.candidates.host||t.candidate.indexOf("typ host")==-1)&&(u.candidates.relay||t.candidate.indexOf("relay")==-1)&&(u.candidates.reflexive||t.candidate.indexOf("srflx")==-1)&&(n(t.candidate),a&&a.send({userid:f.userid,candidate:{sdpMLineIndex:t.sdpMLineIndex,candidate:JSON.stringify(t.candidate)}}))},onmessage:function(n){et.onmessage({data:n,userid:r.userid,extra:r.extra})},onaddstream:function(n){var u,f,i;s(e)&&t||(r.streaminfo&&(u=r.streaminfo.split("----"),u[0]&&(n.streamid=u[0],delete u[0],r.streaminfo=w(u).join("----"))),f=e,f.remote=!0,i=tt(n,f),r.stream=n,i.tagName.toLowerCase()=="audio"?i.addEventListener("play",function(){setTimeout(function(){i.muted=!1;ft(i)},3e3)},!1):rt(i))},onremovestream:function(n){o("onremovestream",n)},onclose:function(n){n.extra=r.extra;n.userid=r.userid;u.onclose(n);u.channels[n.userid]&&delete u.channels[n.userid]},onerror:function(n){n.extra=r.extra;n.userid=r.userid;u.onerror(n)},oniceconnectionstatechange:function(t){n("oniceconnectionstatechange",i(t))},onsignalingstatechange:function(t){n("onsignalingstatechange",i(t))},attachStreams:u.attachStreams,iceServers:u.iceServers,bandwidth:u.bandwidth,sdpConstraints:u.sdpConstraints||{},disableDtlsSrtp:u.disableDtlsSrtp,preferSCTP:!!u.preferSCTP,onSessionDescription:function(n,t){ut({sdp:n,socket:a,streaminfo:t})},socket:a,selfUserid:u.userid};u.playRoleOfInitiator=function(){u.dontAttachStream=!0;u.open();y=w(y);u.dontAttachStream=!1}}function st(n,t){var i,r;if(n)for(i=0;i<n.length;i++)r=n[i],u.streams[r]&&t.removeStream(u.streams[r].stream)}function ut(n){n.socket.send({userid:f.userid,sdp:JSON.stringify(n.sdp),extra:u.extra,renegotiate:!n.renegotiate?!1:n.renegotiate,streaminfo:n.streaminfo||"",labels:n.labels||[]})}function ct(n,t){if(n&&!p[n]&&n!=f.userid){p[n]=n;var i=u.token();it({channel:i,extra:t||{}});b.send({participant:!0,userid:f.userid,targetUser:n,channel:i,extra:u.extra})}}function ft(n){var i={left:!0,extra:u.extra,userid:f.userid,sessionid:f.sessionid},r,t;if(u.isInitiator&&(u.autoCloseEntireSession?i.closeEntireSession=!0:y[0]&&y[0].send({playRoleOfBroadcaster:!0,userid:f.userid})),!n)for(r=y.length,t=0;t<r;t++)socket=y[t],socket&&(socket.send(i),d[socket.channel]&&delete d[socket.channel],delete y[t]);n&&(socket=d[n],socket&&(i.ejected=!0,socket.send(i),y[socket.index]&&delete y[socket.index],delete d[n]));y=w(y)}function lt(){b=u.openSignalingChannel({onmessage:function(n){if(n.userid!=f.userid){if(g&&n.sessionid&&n.userid){u.session=e=n.session;et.onNewSession(n)}if(n.newParticipant&&f.joinedARoom&&f.broadcasterid===n.userid&&ct(n.newParticipant,n.extra),v(p)<u.maxParticipantsAllowed&&n.userid&&n.targetUser==f.userid&&n.participant&&!p[n.userid]&&vt(n.channel||n.userid,n.extra,n.userid),n.userType&&n.userType!=u.userType)if(u.busy)n.userType!=u.userType&&u.reject(n.userid);else{if(n.userType=="admin")if(u.onAdmin)u.onAdmin(n);else u.accept(n.userid);if(n.userType=="guest")if(u.onGuest)u.onGuest(n);else u.accept(n.userid)}if(n.acceptedRequestOf==f.userid&&u.onstats)u.onstats("accepted",n);if(n.rejectedRequestOf==f.userid){if(u.onstats)u.onstats(u.userType?"busy":"rejected",n);rt()}if(n.customMessage)if(n.message.drop){u.ondrop();u.attachStreams=[];for(var t in u.streams)if(u._skip.indexOf(t)==-1)if(t=u.streams[t],t.type=="local")u.detachStreams.push(t.streamid);else u.onstreamended(t.streamObject);n.message.renegotiate&&u.addStream()}else if(u.onCustomMessage)u.onCustomMessage(n.message)}},callback:function(n){n&&(b=n);u.userType&&rt(n||b)},onopen:function(n){n&&(b=n);u.userType&&rt(n||b)}})}function rt(n){if(!n)return setTimeout(function(){rt(b)},1e3);n.send({userType:u.userType,userid:u.userid,extra:u.extra||{}})}function at(){u.direction=="one-way"&&(u.session.oneway=!0);u.direction=="one-to-one"&&(u.maxParticipantsAllowed=1);u.direction=="one-to-many"&&(u.session.broadcast=!0);u.direction=="many-to-many"&&(u.maxParticipantsAllowed&&u.maxParticipantsAllowed!=1||(u.maxParticipantsAllowed=256))}function vt(n,t,i){if(f.requestsFrom||(f.requestsFrom={}),!u.busy&&!f.requestsFrom[i]){var r={userid:i,extra:t,channel:n};if(f.requestsFrom[i]=r,u.onRequest)u.onRequest(r);else ht(r)}}function ht(n){u.userType&&(u.direction==="many-to-many"&&(u.busy=!0),b.send({acceptedRequestOf:n.userid,userid:f.userid,extra:u.extra||{}}));p[n.userid]=n.userid;it({isofferer:!0,userid:n.userid,channel:n.channel,extra:n.extra||{}})}var et=u.config,e=u.session,f={},d={},y=[],p,g,nt,b;f.userid=u.userid=u.userid||u.token();f.sessionid=u.channel;p={};g=!0;u.remove=function(n){f.requestsFrom&&f.requestsFrom[n]&&delete f.requestsFrom[n];u.peers[n]&&(u.peers[n].peer&&u.peers[n].peer.connection&&(u.peers[n].peer.connection.close(),u.peers[n].peer.connection=null),delete u.peers[n]);p[n]&&delete p[n];for(var t in u.streams)if(t=u.streams[t],t.userid==n){u.onstreamended(t.streamObject);t.stop&&t.stop();delete u.streams[t]}d[n]&&delete d[n]};u.refresh=function(){p=[];u.joinedARoom=f.joinedARoom=!1;g=!0;u.busy=!1;for(var n=0;n<u.attachStreams.length;n++)c(u.attachStreams[n]);u.attachStreams=[];r={streams:[],mutex:!1,queueRequests:[]};nt.isOwnerLeaving=!0;u.isInitiator=!1};u.reject=function(n){typeof n!="string"&&(n=n.userid);b.send({rejectedRequestOf:n,userid:u.userid,extra:u.extra||{}})};window.addEventListener("beforeunload",function(){ft()},!1);window.addEventListener("keydown",function(n){n.keyCode==116&&ft()},!1);nt=this;lt();this.initSession=function(){nt.isOwnerLeaving=!1;u.isInitiator=!0;at();e=u.session;p={};f.sessionid=u.sessionid||u.channel;this.isOwnerLeaving=g=!1;f.joinedARoom=!0,function n(){v(p)<u.maxParticipantsAllowed&&!nt.isOwnerLeaving&&b&&b.send({sessionid:f.sessionid,userid:u.userid,session:e,extra:u.extra});u.transmitRoomOnce||nt.isOwnerLeaving||setTimeout(n,u.interval||3e3)}()};this.joinSession=function(n){n=n||{};p={};e=n.session;f.broadcasterid=n.userid;n.sessionid&&(f.sessionid=n.sessionid);g=!1;f.joinedARoom=!0;var t=a();it({channel:t,extra:u.extra});b.send({participant:!0,userid:f.userid,channel:t,targetUser:n.userid,extra:u.extra})};this.send=function(n,t){var r,i;if(n=JSON.stringify(n),t){t.readyState=="open"&&t.send(n);return}for(r in u.channels)i=u.channels[r].channel,i.readyState=="open"&&i.send(n)};this.leave=function(n){ft(n);u.isInitiator&&(nt.isOwnerLeaving=!0,u.isInitiator=!1);for(var t=0;t<u.attachStreams.length;t++)c(u.attachStreams[t]);u.attachStreams=[];r={streams:[],mutex:!1,queueRequests:[]};n||(u.joinedARoom=f.joinedARoom=!1,g=!0);u.busy=!1};this.addStream=function(n){function t(t){var i=t.socket;if(!i)throw"Now such socket exists.";if(ot(i),!t||!t.peer)throw"No peer to renegotiate.";t=t.peer;st(u.detachStreams,t.connection);n.stream&&(e.audio||e.video||e.screen)&&t.connection.addStream(n.stream);t.recreateOffer(e,function(n,t){ut({sdp:n,socket:i,renegotiate:e,labels:u.detachStreams,streaminfo:t});u.detachStreams=[]})}if(e=n.renegotiate,n.socket)t(u.peers[n.socket.userid]);else for(var i in u.peers)t(u.peers[i])};u.request=function(n){u.direction==="many-to-many"&&(u.busy=!0);u.captureUserMedia(function(){it({channel:f.userid,extra:u.extra||{}});b.send({participant:!0,userid:f.userid,extra:u.extra||{},targetUser:n})})};u.sendCustomMessage=function(n){if(!b)return setTimeout(function(){u.sendMessage(n)},1e3);b.send({userid:u.userid,customMessage:!0,message:n})};u.accept=function(n){arguments.length>1&&typeof arguments[0]=="string"&&(n={},arguments[0]&&(n.userid=arguments[0]),arguments[1]&&(n.extra=arguments[1]),arguments[2]&&(n.channel=arguments[2]));u.captureUserMedia(function(){ht(n)})}}function y(f){function b(n,i){var u=f.video;u&&(u[t?"mozSrcObject":"src"]=t?n:window.webkitURL.createObjectURL(n),u.play());f.onsuccess(n,i,v);r.streams[v]=n;r.mutex=!1;r.queueRequests.length&&y(r.queueRequests.shift())}var a,s,w,v;if(r.mutex===!0){r.queueRequests.push(f);return}r.mutex=!0;var l=f.mediaConstraints||{},p=navigator,c=f.constraints||{audio:!0,video:d};c.video==!0&&(c.video=d);typeof l.audio!="undefined"&&(c.audio=l.audio);a=f.media;u&&(s={minWidth:a.minWidth,minHeight:a.minHeight,maxWidth:a.maxWidth,maxHeight:a.maxHeight,minAspectRatio:a.minAspectRatio},w=["1920:1080","1280:720","960:720","640:360","640:480","320:240","320:180"],(w.indexOf(s.minWidth+":"+s.minHeight)==-1||w.indexOf(s.maxWidth+":"+s.maxHeight)==-1)&&e('The min/max width/height constraints you passed "seems" NOT supported.',i(s)),(s.minWidth>s.maxWidth||s.minHeight>s.maxHeight)&&e("Minimum value must not exceed maximum value.",i(s)),s.minWidth>=1280&&s.minHeight>=720&&o("Enjoy HD video! min/"+s.minWidth+":"+s.minHeight+", max/"+s.maxWidth+":"+s.maxHeight),c.video.mandatory=h(c.video.mandatory,s));l.mandatory&&(c.video.mandatory=h(c.video.mandatory,l.mandatory));l.optional&&(c.video.optional[0]=h({},l.optional));n("media hints:",i(c));v=JSON.stringify(c);r.streams[v]?b(r.streams[v],!0):(p.getMedia=p.webkitGetUserMedia||p.mozGetUserMedia,p.getMedia(c,b,f.onerror||function(n){e(i(n))}))}function et(n){function u(u){var f=u.uuid,e;if(typeof u.packets!="undefined"){i[f]=r[f]=parseInt(u.packets);n.onFileStart(u)}n.onFileProgress({remaining:r[f]--,length:i[f],received:i[f]-r[f],maxChunks:i[f],uuid:f,currentPosition:i[f]-r[f]},f);t[f]||(t[f]=[]);t[f].push(u.message);u.last&&(e=t[f].join(""),ot.DataURLToBlob(e,u.fileType,function(i){i.uuid=f;i.name=u.name;i.type=u.fileType;i.extra=u.extra||{};i.url=(window.URL||window.webkitURL).createObjectURL(i);n.autoSaveToDisk&&p.SaveToDisk(i.url,u.name);n.onFileEnd(i);delete t[f]}))}var t={},r={},i={};return{receive:u}}function ht(){function t(t,i,r,u){var f=t.uuid,e,o,s;n[f]||(n[f]=[]);n[f].push(t.message);t.last&&(e=n[f].join(""),t.isobject&&(e=JSON.parse(e)),o=(new Date).getTime(),s=o-t.sendingTime,i&&i({data:e,userid:r,extra:u,latency:s}),delete n[f])}var n={};return{receive:t}}function l(n){var t=n.root,i=n.context;this.context=i;this.volume=0;this.slow_volume=0;this.clip=0;this.script=i.createScriptProcessor(256,1,1);that=this;this.script.onaudioprocess=function(i){for(var u=i.inputBuffer.getChannelData(0),e=0,o=0,f,r=0;r<u.length;++r)e+=u[r]*u[r],Math.abs(u[r])>.99&&(o+=1);if(that.volume=Math.sqrt(e/u.length),f=that.volume.toFixed(2),f>=.1&&t.onspeaking)t.onspeaking(n.event);if(f<.1&&t.onsilence)t.onsilence(n.event)}}function a(){return(Math.random()*(new Date).getTime()).toString(36).replace(/\./g,"")}function s(n){return!n.audio&&!n.video&&!n.screen&&n.data}function w(n){for(var i=[],r=n.length,t=0;t<r;t++)n[t]&&n[t]!==!0&&i.push(n[t]);return i}function n(){window.skipRTCMultiConnectionLogs||console.log(Array.prototype.slice.call(arguments).join("\n"))}function e(){console.error(Array.prototype.slice.call(arguments).join("\n"))}function o(){window.skipRTCMultiConnectionLogs||console.warn(Array.prototype.slice.call(arguments).join("\n"))}function i(n){return JSON.stringify(n,function(n,t){return t&&t.sdp?(console.log(t.sdp.type,"\t",t.sdp.sdp),""):t},"\t")}function v(n){var t=0,i;for(i in n)i&&t++;return t}function tt(n,i){var f=i.audio&&!i.video&&!i.screen,r;return u&&n.getAudioTracks&&n.getVideoTracks&&(f=n.getAudioTracks().length&&!n.getVideoTracks().length),r=document.createElement(f?"audio":"video"),r[t?"mozSrcObject":"src"]=t?n:window.webkitURL.createObjectURL(n),r.controls=!0,r.autoplay=!!i.remote,r.volume=i.remote?1:0,i.remote||(r.muted=!0),r.play(),r}function h(n,t){if(n||(n={}),!t)return n;for(var i in t)n[i]=t[i];return n}function it(n,t){var i=document.createElement("script");i.src=n;t&&(i.onload=t);document.documentElement.appendChild(i)}function ct(t){var o=t.stream,i=t.root,r=t.session||{},u=t.enabled,f,e;if(r.audio||r.video||(r=h(r,{audio:!0,video:!0})),r.type){if(r.type=="remote"&&i.type!="remote")return;if(r.type=="local"&&i.type!="local")return}if(n("session",JSON.stringify(r,null,"\t")),r.audio&&(f=o.getAudioTracks()[0],f&&(f.enabled=!u)),r.video&&(e=o.getVideoTracks()[0],e&&(e.enabled=!u)),i.socket&&(i.type=="local"&&i.socket.send({userid:i.rtcMultiConnection.userid,streamid:i.streamid,mute:!!u,unmute:!u,session:r}),i.type=="remote"&&i.socket.send({userid:i.rtcMultiConnection.userid,promptMuteUnmute:!0,streamid:i.streamid,mute:!!u,unmute:!u,session:r})),i.streamObject.session=r,!!u)i.rtcMultiConnection.onmute(i.streamObject);if(!u)i.rtcMultiConnection.onunmute(i.streamObject)}function c(n){if((!n.getAudioTracks||!n.getVideoTracks)&&n.stop){n.stop();return}for(var i=!1,r=n.getAudioTracks(),u=n.getVideoTracks(),t=0;t<r.length;t++)if(r[t].stop)try{r[t].stop()}catch(f){i=!0;continue}else{i=!0;continue}for(t=0;t<u.length;t++)if(u[t].stop)try{u[t].stop()}catch(f){i=!0;continue}else{i=!0;continue}i&&n.stop&&n.stop()}function lt(r){function h(n,t){if(n.position!=-1){var i=+n.position.toFixed(2).split(".")[1]||100;t.innerHTML=i+"%"}}r.onmessage=function(t){n("onmessage",i(t))};r.onopen=function(t){n("Data connection is opened between you and",t.userid)};r.onerror=function(n){e(onerror,i(n))};r.onclose=function(n){o("onclose",i(n))};var s={};r.body=document.body;r.autoSaveToDisk=!1;r.onFileStart=function(n){var t=document.createElement("div");t.title=n.name;t.innerHTML="<label>0%<\/label> <progress><\/progress>";r.body.insertBefore(t,r.body.firstChild);s[n.uuid]={div:t,progress:t.querySelector("progress"),label:t.querySelector("label")};s[n.uuid].progress.max=n.maxChunks};r.onFileProgress=function(n){var t=s[n.uuid];t&&(t.progress.value=n.currentPosition||n.maxChunks||t.progress.max,h(t.progress,t.label))};r.onFileEnd=function(n){if(s[n.uuid]&&(s[n.uuid].div.innerHTML='<a href="'+n.url+'" target="_blank" download="'+n.name+'">'+n.name+"<\/a>"),r.onFileSent||r.onFileReceived){if(o('Now, "autoSaveToDisk" is false. Read more here: http://www.RTCMultiConnection.org/docs/autoSaveToDisk/'),r.onFileSent)r.onFileSent(n,n.uuid);if(r.onFileReceived)r.onFileReceived(n.name,n)}};r.onstream=function(n){r.body.insertBefore(n.mediaElement,r.body.firstChild)};r.onstreamended=function(n){n.mediaElement&&n.mediaElement.parentNode&&n.mediaElement.parentNode.removeChild(n.mediaElement)};r.onmute=function(n){n.session.video&&n.mediaElement.setAttribute("poster","//www.webrtc-experiment.com/images/muted.png")};r.onunmute=function(n){n.session.video&&n.mediaElement.removeAttribute("poster")};r.onleave=function(t){n("onleave",i(t))};r.peers={};r._skip=["stop","mute","unmute","_private"];r.streams={mute:function(n){this._private(n,!0)},unmute:function(n){this._private(n,!1)},_private:function(n,t){for(var i in this)r._skip.indexOf(i)==-1&&this[i]._private(n,t)},stop:function(n){var t,i;for(i in this)i!="stop"&&i!="mute"&&i!="unmute"&&i!="_private"&&(t=this[i],n||t.stop(),n=="local"&&t.type=="local"&&t.stop(),n=="remote"&&t.type=="remote"&&t.stop())}};r.channels={};r.extra={};r.session={audio:!0,video:!0};r.bandwidth={};u&&f>=28&&!nt&&(r.bandwidth.audio=80,r.bandwidth.video=256);r.preferSCTP=!0;r.fileQueue={};r.media={min:function(n,t){this.minWidth=n;this.minHeight=t},minWidth:320,minHeight:180,max:function(n,t){this.maxWidth=n;this.maxHeight=t},maxWidth:1280,maxHeight:720,bandwidth:256,minFrameRate:1,maxFrameRate:30,minAspectRatio:1.77};r.candidates={host:!0,relay:!0,reflexive:!0};r.mediaConstraints={};r.sdpConstraints={};r.attachStreams=[];r.detachStreams=[];r.maxParticipantsAllowed=256;r.direction="many-to-many";r._getStream=function(n){return{rtcMultiConnection:n.rtcMultiConnection,streamObject:n.streamObject,stream:n.stream,userid:n.userid,streamid:n.streamid,socket:n.socket,type:n.type,mediaElement:n.mediaElement,stop:function(){this.socket&&(this.type=="local"&&this.socket.send({userid:this.rtcMultiConnection.userid,streamid:this.streamid,stopped:!0}),this.type=="remote"&&this.socket.send({userid:this.rtcMultiConnection.userid,promptStreamStop:!0,streamid:this.streamid}));var n=this.stream;n&&n.stop&&c(n)},mute:function(n){this._private(n,!0)},unmute:function(n){this._private(n,!1)},_private:function(n,t){ct({root:this,session:n,enabled:t,stream:this.stream})},startRecording:function(n){if(n||(n={audio:!0,video:!0}),!window.RecordRTC){var t=this;return it("//www.webrtc-experiment.com/RecordRTC.js",function(){t.startRecording(n)})}this.recorder=new MRecordRTC;this.recorder.mediaType=n;this.recorder.addStream(this.stream);this.recorder.startRecording()},stopRecording:function(n,t){t?typeof t=="string"&&(t={audio:t=="audio",video:t=="video"}):t={audio:!0,video:!0};this.recorder.stopRecording();this.recorder.getBlob(function(t){n(t.audio||t.video,t.video)})}}};r.token=function(){return(Math.random()*(new Date).getTime()).toString(36).replace(/\./g,"")};r.userid=r.token();r.set=function(n){for(var t in n)this[t]=n[t];return this};r.firebase="rtcweb";r.onMediaError=function(n){e(n)};r.stats={};r.getStats=function(n){var t=0,i;for(i in this.peers)t++;this.stats.numberOfConnectedUsers=t;n&&n(this.stats)};r.caniuse={RTCPeerConnection:!!b,getUserMedia:!!y,AudioContext:!!AudioContext,ScreenSharing:u&&f>=26&&location.protocol=="https:",checkIfScreenSharingFlagEnabled:function(n){function c(t){t.stop&&t.stop();n&&n(!0)}function l(){s=!0;n&&n(r>5,i)}var i,u,r,s;if(t&&(i="Screen sharing is NOT supported on Firefox.",e(i),n&&n(!1)),location.protocol!=="https:"&&(i="Screen sharing is NOT supported on "+location.protocol+" Try https!",e(i),n))return n(!1);f<26&&(i="Screen sharing support is suspicious!",o(i));u={video:{mandatory:{chromeMediaSource:"screen"}}};r=0,function h(){r++;s||setTimeout(h,10)}();navigator.webkitGetUserMedia(u,c,l)},RtpDataChannels:u&&f>=25,SctpDataChannels:u&&f>=31};r.snapshots={};r.takeSnapshot=function(n,t){var u,r,i,f;for(u in this.streams)if(u=this.streams[u],u.userid==n){r=u.streamObject.mediaElement;i=document.createElement("canvas");i.width=r.videoWidth||r.clientWidth;i.height=r.videoHeight||r.clientHeight;f=i.getContext("2d");f.drawImage(r,0,0,i.width,i.height);this.snapshots[n]=i.toDataURL();t&&t(this.snapshots[n]);continue}};r.saveToDisk=function(n){n.size&&n.type?p.SaveToDisk(URL.createObjectURL(n)):p.SaveToDisk(n)};r._mediaSources={};r.selectDevices=function(n,t){function i(n){n&&(r._mediaSources[n.kind]=n.id)}n&&i(this.devices[n]);t&&i(this.devices[t])};r.devices={};r.getDevices=function(n){if(!!window.MediaStreamTrack&&!!MediaStreamTrack.getSources){MediaStreamTrack.getSources(function(t){for(var f=[],u=0;u<t.length;u++)f.push(t[u]);i(f);n&&n(r.devices)});var t=0;function i(n){var u=n[t];u&&(r.devices[u.id]=u,t++,i(n))}}};r.onCustomMessage=function(t){n("Custom message",t)};r.ondrop=function(){n("Connection is dropped!")};r.drop=function(n){n=n||{};this.attachStreams=[];for(var t in this.streams)if(this._skip.indexOf(t)==-1)if(t=this.streams[t],t.type=="local")this.detachStreams.push(t.streamid);else this.onstreamended(t.streamObject);this.sendCustomMessage({drop:!0,dontRenegotiate:typeof n.renegotiate=="undefined"?!0:n.renegotiate})};!window.AudioContext||(r._audioContext=new AudioContext)}var g,f;window.RTCMultiConnection=function(n){function p(t){if(e.openSignalingChannel)return t();if(!window.Firebase)return it("//www.webrtc-experiment.com/firebase.js",function(){p(t)});var i={},r=new Firebase("//"+e.firebase+".firebaseio.com/"+e.channel);r.on("child_added",function(n){var t=n.val();if(t.sender!=e.userid){if(i[t.channel]&&i[t.channel].onmessage)i[t.channel].onmessage(t.message);n.ref().remove()}});e.openSignalingChannel=function(t){var u=t.channel||e.channel;return i[u]=t,t.onopen&&setTimeout(t.onopen,1e3),{send:function(n){r.push({sender:e.userid,channel:u,message:n})},channel:n}};r.onDisconnect().remove();t()}function k(){if(!e.config&&(e.config={onNewSession:function(n){if(!h){e._session=n;return}return e.onNewSession?e.onNewSession(n):e.joinedARoom?void 0:(e.joinedARoom=!0,d(n))},onmessage:function(n){if(n.data.size||(n.data=JSON.parse(n.data)),n.data.type==="text")b.receive(n.data,e.onmessage,n.userid,n.extra);else if(typeof n.data.maxChunks!="undefined")w.receive(n.data);else e.onmessage(n)}},h=new rt(e),w=new et(e),b=new ht,e._session))e.config.onNewSession(e._session)}function d(n){if(!n||!n.userid||!n.sessionid)throw'invalid data passed over "join" method';e.session=n.session;extra=e.extra||n.extra||{};n.oneway||n.data?h.joinSession(n,extra):v(function(){h.joinSession(n,extra)})}function v(n,o){function v(n,o,s){var v={onsuccess:function(n,t,i){var f,c,v,y,p;if(t)return o&&o(n);s&&u&&(n=new window.webkitMediaStream(n.getAudioTracks()));f=tt(n,h);f.muted=!0;n.onended=function(){e.onstreamended(v);var n=e.streams[c];n&&n.socket&&n.socket.send({userid:e.userid,streamid:n.streamid,stopped:!0});r.streams[i]&&delete r.streams[i]};c=a();n.streamid=c;v={stream:n,streamid:c,mediaElement:f,blobURL:f.mozSrcObject||f.src,type:"local",userid:e.userid||"self",extra:e.extra};y={stream:n,userid:e.userid||"self",streamid:c,type:"local",streamObject:v,mediaElement:f,rtcMultiConnection:e};e.attachStreams.push(n);e.__attachStreams.push(y);e.streams[c]=e._getStream(y);e.onstream(v);o&&o(n);e.onspeaking&&(p=new l({context:e._audioContext,root:e,event:v}),p.connectToSource(n))},onerror:function(n){e.onMediaError(i(n));if(h.audio)e.onMediaError("Maybe microphone access is denied.");if(h.video)e.onMediaError("Maybe webcam access is denied.");if(h.screen)if(t)e.onMediaError("Firefox has not yet released their screen capturing modules. Still work in progress! Please try chrome for now!");else if(location.protocol!=="https:")e.onMediaError("<https> is mandatory to capture screen.");else{e.onMediaError("Unable to detect actual issue. Trying to check availability of screen sharing flag.");e.caniuse.checkIfScreenSharingFlagEnabled(function(n,t){if(n)if(f<31)e.onMediaError("Multi-capturing of screen is not allowed. Capturing process is denied. Try chrome >= M31.");else e.onMediaError("Unknown screen capturing error.");if(t)e.onMediaError(t);if(!t)e.onMediaError('It seems that "chrome://flags/#enable-usermedia-screen-capture" flag is not enabled.')})}},mediaConstraints:e.mediaConstraints||{}};v.constraints=n||c;v.media=e.media;y(v)}var h=o||e.session,c,p;if(e.dontAttachStream)return n();if(s(h)||!e.isInitiator&&h.oneway)return e.attachStreams=[],n();c={audio:!!h.audio,video:!!h.video};e._mediaSources.audio&&(c.audio={optional:[{sourceId:e._mediaSources.audio}]});e._mediaSources.video&&(c.video={optional:[{sourceId:e._mediaSources.video}]});p={audio:!1,video:{mandatory:{chromeMediaSource:"screen"},optional:[]}};h.screen?v(p,c.audio||c.video?function(){v(c,n)}:n):v(c,n,h.audio&&!h.video)}this.channel=n||location.href.replace(/\/|:|#|%|\.|\[|\]/g,"");this.open=function(n){e.joinedARoom=!0;n&&(e.channel=n);e.isInitiator=!0;p(function(){k();v(h.initSession)})};this.connect=function(n){return n&&(e.channel=n),p(k),this};this.join=d;this.send=function(n,t){if(!n)throw"No file, data or text message to share.";if(!!n.forEach){for(var i=0;i<n.length;i++)e.send(n[i],t);return}typeof n.size!="undefined"&&typeof n.type!="undefined"?g.send({file:n,channel:h,_channel:t,root:e}):st.send({text:n,channel:h,_channel:t,preferSCTP:e.preferSCTP})};var e=this,h,w,b;this.captureUserMedia=v;this.leave=function(n){var i,t;if(h.leave(n),!n){for(i=e.attachStreams,t=0;t<i.length;t++)c(i[t]);r.streams=[];e.attachStreams=[]}};this.eject=function(n){if(!connection.isInitiator)throw"Only session-initiator can eject a user.";this.leave(n)};this.close=function(){e.autoCloseEntireSession=!0;h.leave()};this.renegotiate=function(n){h.addStream({renegotiate:{oneway:!0,audio:!0,video:!0},stream:n})};this.addStream=function(n,t){function r(i){h.addStream({stream:i,renegotiate:n||e.session,socket:t})}if(n){var i;!e.isInitiator&&n.oneway&&(n.oneway=!1,i=!0);v(function(t){i&&(n.oneway=!0);r(t)},n)}else r()};this.removeStream=function(n){if(!this.streams[n])return o("No such stream exists. Stream-id:",n);this.detachStreams.push(n)};lt(this);this.__attachStreams=[]};var b=window.mozRTCPeerConnection||window.webkitRTCPeerConnection,ut=window.mozRTCSessionDescription||window.RTCSessionDescription,ft=window.mozRTCIceCandidate||window.RTCIceCandidate,k={create:function(n,i){h(this,i);var r=this;return this.type=n,this.init(),this.attachMediaStreams(),s(this.session)&&t&&navigator.mozGetUserMedia({audio:!0,fake:!0},function(t){r.connection.addStream(t);n=="offer"&&r.createDataChannel();r.getLocalDescription(n);n=="answer"&&r.createDataChannel()},this.onMediaError),!s(this.session)&&t&&(this.session.data&&n=="offer"&&this.createDataChannel(),this.getLocalDescription(n),this.session.data&&n=="answer"&&this.createDataChannel()),u&&r.getLocalDescription(n),this},getLocalDescription:function(t){n("peer type is",t);t=="answer"&&this.setRemoteDescription(this.offerDescription);var i=this;this.connection[t=="offer"?"createOffer":"createAnswer"](function(n){n.sdp=i.serializeSdp(n.sdp);i.connection.setLocalDescription(n);i.onSessionDescription(n,i.streaminfo)},this.onSdpError,this.constraints)},serializeSdp:function(n){return n=this.setBandwidth(n),this.hold?n=n.replace(/sendonly|recvonly|sendrecv/g,"inactive"):this.prevSDP&&(n=n.replace(/inactive/g,"sendrecv")),n},init:function(){this.setConstraints();this.connection=new b(this.iceServers,this.optionalArgument);this.session.data&&u&&this.createDataChannel();this.connection.onicecandidate=function(n){if(!t.renegotiate&&n.candidate)t.onicecandidate(n.candidate)};this.connection.onaddstream=function(i){n("onaddstream",i.stream);t.onaddstream(i.stream)};this.connection.onremovestream=function(n){t.onremovestream(n.stream)};this.connection.onsignalingstatechange=function(){t.connection&&t.oniceconnectionstatechange({iceGatheringState:t.connection.iceGatheringState,signalingState:t.connection.signalingState})};this.connection.oniceconnectionstatechange=function(){t.connection&&t.oniceconnectionstatechange({iceGatheringState:t.connection.iceGatheringState,signalingState:t.connection.signalingState})};var t=this},setBandwidth:function(n){if(nt||t||!this.bandwidth)return n;var i=this.bandwidth;return(i.audio||i.video||i.data)&&(n=n.replace(/b=AS([^\r\n]+\r\n)/g,"")),i.audio&&(n=n.replace(/a=mid:audio\r\n/g,"a=mid:audio\r\nb=AS:"+i.audio+"\r\n")),i.video&&(n=n.replace(/a=mid:video\r\n/g,"a=mid:video\r\nb=AS:"+i.video+"\r\n")),i.data&&!this.preferSCTP&&(n=n.replace(/a=mid:data\r\n/g,"a=mid:data\r\nb=AS:"+i.data+"\r\n")),n},setConstraints:function(){this.constraints={optional:[],mandatory:{OfferToReceiveAudio:!0,OfferToReceiveVideo:!0}};n("sdp-constraints",i(this.constraints.mandatory));this.optionalArgument={optional:[{DtlsSrtpKeyAgreement:!0}]};this.preferSCTP||(this.optionalArgument={optional:[{RtpDataChannels:!0}]});n("optional-argument",i(this.optionalArgument.optional));var r=[];t&&r.push({url:"stun:23.21.150.121"});u&&(r.push({url:"stun:stun.l.google.com:19302"}),r.push({url:"stun:stun.anyfirewall.com:3478"}));u&&f<28&&r.push({url:"turn:homeo@turn.bistri.com:80",credential:"homeo"});u&&f>=28&&(r.push({url:"turn:turn.bistri.com:80",credential:"homeo",username:"homeo"}),r.push({url:"turn:turn.anyfirewall.com:3478?transport=udp",credential:"webrtc",username:"webrtc"}),r.push({url:"turn:turn.anyfirewall.com:3478?transport=tcp",credential:"webrtc",username:"webrtc"}),r.push({url:"turn:turn.anyfirewall.com:443?transport=tcp",credential:"webrtc",username:"webrtc"}));this.iceServers={iceServers:r};n("ice-servers",i(this.iceServers.iceServers))},onSdpError:function(n){var t=i(n);t&&t.indexOf("RTP/SAVPF Expects at least 4 fields")!=-1&&(t="It seems that you are trying to interop RTP-datachannels with SCTP. It is not supported!");e("onSdpError:",t)},onMediaError:function(n){e(i(n))},setRemoteDescription:function(t){if(!t)throw"Remote session description should NOT be NULL.";n("setting remote description",t);this.connection.setRemoteDescription(new ut(t))},addIceCandidate:function(n){this.connection.addIceCandidate(new ft({sdpMLineIndex:n.sdpMLineIndex,candidate:n.candidate}))},createDataChannel:function(n){var r,i;this.channels||(this.channels=[]);r={};u&&!this.preferSCTP&&(r.reliable=!1);t&&(this.connection.onconnection=function(){i.socket.send({userid:i.selfUserid,isCreateDataChannel:!0})});(this.type=="answer"||t)&&(this.connection.ondatachannel=function(n){i.setChannelEvents(n.channel)});(u&&this.type=="offer"||t)&&this.setChannelEvents(this.connection.createDataChannel(n||"channel",r));i=this},setChannelEvents:function(n){var t=this;n.onmessage=function(n){t.onmessage(n.data)};n.onopen=function(){t.onopen(n)};n.onerror=function(n){t.onerror(n)};n.onclose=function(n){t.onclose(n)};this.channels.push(n)},attachMediaStreams:function(){for(var i=this.attachStreams,t=0;t<i.length;t++)n("attaching stream:",i[t].streamid),this.connection.addStream(i[t]);this.attachStreams=[];this.getStreamInfo()},getStreamInfo:function(){var t,n;for(this.streaminfo="",t=this.connection.getLocalStreams(),n=0;n<t.length;n++)n==0?this.streaminfo=t[n].streamid:this.streaminfo+="----"+t[n].streamid},recreateOffer:function(t,i){n("recreating offer");this.type="offer";this.renegotiate=!0;this.session=t;this.setConstraints();this.onSessionDescription=i;this.getStreamInfo();this.getLocalDescription("offer")},recreateAnswer:function(t,i,r){n("recreating answer");this.type="answer";this.renegotiate=!0;this.session=i;this.setConstraints();this.onSessionDescription=r;this.offerDescription=t;this.getStreamInfo();this.getLocalDescription("answer")}},d={mandatory:{},optional:[]},r={streams:[],mutex:!1,queueRequests:[]};g={send:function(n){function v(){var n=URL.createObjectURL(new Blob(["function readFile(_file) {postMessage(new FileReaderSync().readAsDataURL(_file));};this.onmessage =  function (e) {readFile(e.data);}"],{type:"application/javascript"})),t=new Worker(n);return URL.revokeObjectURL(n),t}function h(n,o){var s={type:"file",uuid:t.uuid,maxChunks:i,currentPosition:i-u,name:t.name,fileType:t.type,size:t.size};if(n){o=n;i=u=s.packets=parseInt(o.length/f);t.maxChunks=s.maxChunks=i;s.currentPosition=i-u;r.onFileStart(t)}r.onFileProgress({remaining:u--,length:i,sent:i-u,maxChunks:i,uuid:t.uuid,currentPosition:i-u},t.uuid);if(o.length>f)s.message=o.slice(0,f);else{s.message=o;s.last=!0;s.name=t.name;s.extra=r.extra||{};t.url=URL.createObjectURL(t);r.onFileEnd(t)}c.send(s,l);e=o.slice(s.message.length);e.length&&setTimeout(function(){h(null,e)},r.chunkInterval||500)}var r=n.root,c=n.channel,l=n._channel,t=n.file,f,o,s;if(!n.file){console.error("You must attach/select a file.");return}f=!!navigator.mozGetUserMedia||r.preferSCTP?15e3:1e3;r.chunkSize&&(f=r.chunkSize);var e="",i=0,u=0;t.uuid=a();window.Worker?(o=v(),o.onmessage=function(n){h(n.data)},o.postMessage(t)):(s=new FileReader,s.onload=function(n){h(n.target.result)},s.readAsDataURL(t))}};var p={SaveToDisk:function(n,t){var i=document.createElement("a"),r;i.href=n;i.target="_blank";i.download=t||n;r=new MouseEvent("click",{view:window,bubbles:!0,cancelable:!0});i.dispatchEvent(r);(window.URL||window.webkitURL).revokeObjectURL(i.href)}},ot={DataURLToBlob:function(n,t,i){function o(){var n=URL.createObjectURL(new Blob(['function getBlob(_dataURL, _fileType) {var binary = atob(_dataURL.substr(_dataURL.indexOf(",") + 1)),i = binary.length,view = new Uint8Array(i);while (i--) {view[i] = binary.charCodeAt(i);};postMessage(new Blob([view], {type: _fileType}));};this.onmessage =  function (e) {var data = JSON.parse(e.data); getBlob(data.dataURL, data.fileType);}'],{type:"application/javascript"})),t=new Worker(n);return URL.revokeObjectURL(n),t}var u;if(!window.Worker){for(var f=atob(n.substr(n.indexOf(",")+1)),r=f.length,e=new Uint8Array(r);r--;)e[r]=f.charCodeAt(r);i(new Blob([e]))}else u=o(),u.onmessage=function(n){i(n.data)},u.postMessage(JSON.stringify({dataURL:n,fileType:t}))}},st={send:function(n){function f(i,l){var a={type:"text",uuid:o,sendingTime:s};i&&(l=i,a.packets=parseInt(l.length/u));l.length>u?a.message=l.slice(0,u):(a.message=l,a.last=!0,a.isobject=e);h.send(a,c);r=l.slice(a.message.length);r.length&&(n.preferSCTP||t?setTimeout(function(){f(null,r)},100):setTimeout(function(){f(null,r)},500))}var h=n.channel,c=n._channel,i=n.text,u=1e3,r="",e=!1,o,s;typeof i!="string"&&(e=!0,i=JSON.stringify(i));o=a();s=(new Date).getTime();f(i)}};l.prototype.connectToSource=function(n){this.mic=this.context.createMediaStreamSource(n);this.mic.connect(this.script);this.script.connect(this.context.destination)};l.prototype.stop=function(){this.mic.disconnect();this.script.disconnect()};var u=!!navigator.webkitGetUserMedia,t=!!navigator.mozGetUserMedia,nt=navigator.userAgent.match(/Android|iPhone|iPad|iPod|BlackBerry|IEMobile/i);window.MediaStream=window.MediaStream||window.webkitMediaStream;window.AudioContext=window.AudioContext||window.webkitAudioContext;f=!navigator.mozGetUserMedia?parseInt(navigator.userAgent.match(/Chrom(e|ium)\/([0-9]+)\./)[2]):0})()