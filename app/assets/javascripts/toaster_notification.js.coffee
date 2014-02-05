total_visible = 5
max_pending = total_visible - 2
events = null

rotate = () ->
  pending = 0
  eves = [].slice.call(events.querySelectorAll("li")).reverse()
  for eve in eves
    switch eve.className
      when "recent"
        eve.className = "pending"
      when "pending"
        if pending++ > max_pending
          eve.className = "sweep"
      when "sweep"
        eve.parentNode.removeChild(eve)

this.toaster_notification = (message) ->
  if events
    eve = document.createElement("li")
    eve.className = "recent"
    eve.innerHTML = message
    events.appendChild(eve)
    setTimeout(rotate, 200)

this.toaster_notification_create = () ->
  events = document.getElementById("events")
