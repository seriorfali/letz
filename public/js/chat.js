function receiveChatRequests() {
  socket.on("chat request", function(data) {
    var chatRequest = "<div class='chatRequests'>" + "<p>" + ((data.requestingUser.local.first_name + " " + data.requestingUser.local.last_name) || data.requestingUser.facebook.name) + " would like to chat." + "</p>" + "<button class='acceptChatRequest' type='button'>ACCEPT</button>" + "</div>"

    $("#container").append(chatRequest)

    $(".acceptChatRequest").click(function() {
      socket.emit("accepted request", data)
      generateChat(data)
    })
  })
}

function sendChatRequest(userMarker, infoWindow) {
  var targetUser = userMarker.user

  console.log(targetUser)

  var sentRequest = "Chat request sent to " + ((targetUser.local.first_name + " " + targetUser.local.last_name) || targetUser.facebook.name) + "."

  infoWindow.setContent(sentRequest)

  socket.emit("chat request", {targetUser: targetUser, requestingUser: currentUser})

  socket.on("accepted request", function(data) {
    infoWindow.close()
    generateChat()
  })
}

function generateChat(users) {
  var chatId = users.requestingUser.socketId + users.targetUser.socketId

  var chatWindow = "<div class='chats' id='" + chatId + "'>" + "<ul class='messages'></ul>" + "<form class='sendMessage' action=''>" + "<input class='newMessages' autocomplete='off' /><button>Send</button>" + "</form>" + "</div>"

  $("#container").append(chatWindow)

  $("#" + chatId).dialog()

  // To send to server a message containing user chat message and chat window ID when send button clicked.
  $(".sendMessage").submit(function() {
    var message = {
      body: $(this).children(".newMessages").val(),
      chatId: chatId
    }
    socket.emit("chat message", message)
  })

  socket.on("update chat", function(data) {
    $(".chats[id='" + data.chatId + "'] .messages").append($("<li>"+ "<b>" + ((currentUser.local.first_name + " " + currentUser.local.last_name) || currentUser.facebook.name) + "</b>" + " " + data.body + "<br>"))
  })
}
