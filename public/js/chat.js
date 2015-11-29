<<<<<<< HEAD
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

=======
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

>>>>>>> 20784cd194b7c9e944f12fe2eee8fcda738d6ffb
function sendChatRequest(userMarker, infoWindow) {
  var targetUser = userMarker.user

  console.log(targetUser)

<<<<<<< HEAD
  var sentRequest = "Chat request sent to " + ((targetUser.local.first_name + " " + targetUser.local.last_name) || targetUser.facebook.name) + "."

  infoWindow.setContent(sentRequest)

  socket.emit("chat request", {targetUser: targetUser, requestingUser: currentUser})
=======
  var sentRequest = "Chat request sent to " + getName(targetUser) + "."

  infoWindow.setContent(sentRequest)

  socket.emit("chat request", {
    users: {
      targetUser: targetUser,
      requestingUser: currentUser
    },
    chatId: currentUser.socketId + targetUser.socketId
  })
>>>>>>> 20784cd194b7c9e944f12fe2eee8fcda738d6ffb

  socket.on("accepted request", function(data) {
    infoWindow.close()
    generateChat(data)
  })
}

<<<<<<< HEAD
function generateChat(users) {
  var chatId = users.requestingUser.socketId + users.targetUser.socketId
=======
function inviteToChat() {

}

function generateChat(data) {
  var chatId = data.chatId

  chats.push({
    id: data.chatId,
    users: data.users
  })
>>>>>>> 20784cd194b7c9e944f12fe2eee8fcda738d6ffb

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
<<<<<<< HEAD
    $(".chats[id='" + data.chatId + "'] .messages").append($("<li>"+ "<b>" + ((currentUser.local.first_name + " " + currentUser.local.last_name) || currentUser.facebook.name) + "</b>" + " " + data.body + "<br>"))
  })
=======
    $(".chats[id='" + data.chatId + "'] .messages").append("<li>"+ "<b>" + getName(currentUser) + "</b>" + " " + data.body + "<br>")
  })

  $("#" + chatId).on("dialogueclose", function() {
    socket.emit("left chat", {leavingUser: currentUser, chatId: chatId})
  })

  socket.on("someone left chat", function(user) {
    $(".chats[id='" + data.chatId + "'] .messages").append("<li>"+ "<b>" + getName(user) + "</b>" + " has left the chat.")
  }
>>>>>>> 20784cd194b7c9e944f12fe2eee8fcda738d6ffb
}
