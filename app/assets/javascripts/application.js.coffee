#= require 'rtcmulticonnection'
#= require_tree .

document.addEventListener "DOMContentLoaded", ->
  toaster_notification_create()
  webrtc_create()