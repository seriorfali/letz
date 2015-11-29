var chats = []

function receiveChatRequests() {
  socket.on("chat request", function(data) {
    var requestingUser = data.users.requestingUser
    var chatRequest = "<div class='chatRequests'>" + "<p>" + getName(requestingUser) + " would like to chat." + "</p>" + "<button class='acceptChatRequest' type='button'>ACCEPT</button>" + "</div>"

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

  var sentRequest = "Chat request sent to " + getName(targetUser) + "."

  infoWindow.setContent(sentRequest)

  socket.emit("chat request", {
    users: {
      targetUser: targetUser,
      requestingUser: currentUser
    },
    chatId: currentUser.socketId + targetUser.socketId
  })

  socket.on("accepted request", function(data) {
    infoWindow.close()
    generateChat(data)
  })
}

function inviteToChat() {

}

function generateChat(data) {
  var chatId = data.chatId

  chats.push({
    id: data.chatId,
    users: data.users
  })

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
    $(".chats[id='" + data.chatId + "'] .messages").append("<li>"+ "<b>" + getName(currentUser) + "</b>" + " " + data.body + "<br>")
  })

  $("#" + chatId).on("dialogueclose", function() {
    socket.emit("left chat", {leavingUser: currentUser, chatId: chatId})
  })

  socket.on("someone left chat", function(user) {
    $(".chats[id='" + data.chatId + "'] .messages").append("<li>"+ "<b>" + getName(user) + "</b>" + " has left the chat.")
  }
}
