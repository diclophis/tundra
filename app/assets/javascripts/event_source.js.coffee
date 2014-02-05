this.event_source = (resource) ->
  event_sources = document.getElementById("event-sources")
  primary_source = new EventSource(resource)
  #addEventListener "unload", ->
  #  primary_source.close()

  primary_source.onmessage = (e) ->
    toaster_notification(e.data)
