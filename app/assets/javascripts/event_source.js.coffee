this.event_source = (resource) ->
  event_sources = document.getElementById("event-sources")
  primary_source = new EventSource(resource)
  addEventListener "unload", ->
    primary_source.close()

  primary_source.onmessage = (e) ->
    #msg = document.createElement("li")
    #msg.innerHTML = e.data
    #event_sources.appendChild(msg)
    toaster_notification(e.data)
