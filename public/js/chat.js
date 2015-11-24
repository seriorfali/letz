$(function() {

  // Connection to socket.io.
  var socket = io()
  var currentUser

  // AJAX request to retrieve current user.
  $.get("/api/users/current", success: function(user) {
    currentUser = user
    console.log(currentUser)
  })

  $(".chats").dialog()

  // To send to server a message containing user chat message and chat window ID when send button clicked.
  $(".sendMessage").submit(function() {
    var message = {
      body: $(this).children(".newMessages").val(),
      chatWindowId: $(this).closest().attr("id")
    }
    socket.emit("chat message", message)
  })

  socket.on("update chat", function(data) {
    $(".chats[id='" + data.chatWindowId + "'] .messages").append($("<li>".text("<b>" + (currentUser.local.first_name + " " + currentUser.local.last_name || currentUser.facebook.name) + " " + "</b>" + data.body + "<br>")))
    console.log(data.body)
  })
})
