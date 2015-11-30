<<<<<<< HEAD
$(function() {
  function generateChat() {
    // Connection to socket.io.
    var socket = io()
    var currentUser

    // AJAX request to retrieve current user.
    $.get("/api/users/current")
    .done(function(user) {
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
  }
})
=======
var chats = []

function getChat(chatId) {
  var identifiedChat
  for (var c in chats) {
    var chat = chats[c]
    if (chat.id === chatId) {
      identifiedChat = chat
    }
  }
  return identifiedChat
}

function receiveChatRequestsAndInvites() {
  socket.on("chat request", function(data) {
    var requestingUser = data.users.requestingUser
    var chatRequest = "<div class='chatRequests'>" + "<p>" + getName(requestingUser) + " would like to chat." + "</p>" + "<button class='acceptChatRequest' type='button'>ACCEPT</button>" + "</div>"

    $("#container").append(chatRequest)

    $(".acceptChatRequest").click(function(event) {
      event.preventDefault()
      socket.emit("accepted request", data)
      generateChat(data)
    })
  })

  socket.on("chat invite", function(data) {
    var invitingUser = data.invitingUser
    var chatInvite = "<div class='chatInvites'>" + "<p>" + getName(invitingUser) + " has invited you to a chat." + "</p>" + "<button class='acceptChatInvite' type='button'>ACCEPT</button>" + "</div>"

    $("#container").append(chatInvite)

    $(".acceptChatInvite").click(function(event) {
      event.preventDefault()
      socket.emit("accepted invite", {joiningUser: currentUser, chatId: chatId})
      generateChat({
        chatId: data.chatId,
        users: data.users
      })
    })
  })
}

function sendChatRequest(userMarker, infoWindow) {
  var targetUser = userMarker.user

  var sentRequest = "Chat request sent to " + getName(targetUser) + "."

  infoWindow.setContent(sentRequest)

  socket.emit("chat request", {
    users: {
      targetUser: targetUser,
      requestingUser: currentUser,
      invitedUsers: []
    },
    chatId: currentUser.socketId + targetUser.socketId
  })

  socket.on("accepted request", function(data) {
    socket.emit("join chat", data)
    infoWindow.close()
    generateChat(data)
  })
}

function inviteToChat(userMarker, infoWindow, chatId) {
  var chat = getChat(chatId)
    , invitedUser = userMarker.user

  var sentInvite = "Invitation sent to " + getName(invitedUser) + "."

  infoWindow.setContent(sentInvite)

  socket.emit("chat invite", {
    users: chat.users,
    chatId: chatId,
    invitedUser: invitedUser,
    invitingUser: currentUser
  })

  socket.on("accepted invite", function(data) {
    infoWindow.close()
  })
}

function generateChat(data) {
  var chatId = data.chatId
    , chat = getChat(chatId)

  chats.push({
    id: data.chatId,
    users: data.users
  })

  var chatWindow = "<div class='chats' id='" + chatId + "'>" + "<ul class='messages'></ul>" + "<form class='sendMessage' action=''>" + "<input class='newMessages' autocomplete='off' /><button>Send</button>" + "</form>" + "</div>"

  $("#container").append(chatWindow)

  $("#" + chatId).dialog()

  // To send to server a message containing user chat message and chat window ID when send button clicked.
  $(".sendMessage").submit(function(event) {
    event.preventDefault()
    var message = {
      sender: currentUser,
      body: $(this).children(".newMessages").val(),
      chatId: chatId
    }
    socket.emit("chat message", message)
    $(this).children(".newMessages").val("")
  })

  socket.on("update chat", function(data) {
    $(".chats[id='" + data.chatId + "'] .messages").append("<li>"+ "<b>" + getName(data.sender) + "</b>" + " " + data.body + "<br>")
  })

  $("#" + chatId).on("dialogueclose", function() {
    socket.emit("left chat", {leavingUser: currentUser, chatId: chatId})
  })

  socket.on("someone joined chat", function(user) {
    chat.invitedUsers.push(user)
    $(".chats[id='" + data.chatId + "'] .messages").append("<li>"+ "<b>" + getName(user) + "</b>" + " has joined the chat.")
  })

  socket.on("someone left chat", function(user) {
    $(".chats[id='" + data.chatId + "'] .messages").append("<li>"+ "<b>" + getName(user) + "</b>" + " has left the chat.")
  })
}
>>>>>>> d4ff99cd272bca2dd49ec0660dbbfaae7e9408a9
