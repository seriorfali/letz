// Packages setup.
var express = require("express")
  , app = express()
  , mongoose = require("mongoose")
  , logger = require("morgan")
  , bodyParser = require("body-parser")
  , cookieParser = require("cookie-parser")
  , session = require("express-session")
  , passport = require("passport")
  , passportConfig = require("./config/passport.js")
  , http = require("http")/*.Server(app)*/
    // To allow HTTP to be bound to same port as WebSockets.
  , httpServer = http.Server(app)
    // To have provider of WebSockets connection to client listen at same port as HTTP.
  // , webSocketsProvider = require("socket.io")(httpServer)
  , io   = require('socket.io')(httpServer)
  , connectedUsers = {}

  // Database connection.
  // mongoose.connect("mongodb://seriorfali:oolpI700#@ds045054.mongolab.com:45054/letz-app")
  mongoose.connect("mongodb://localhost/myapp")


// Middleware.
app.use(logger("dev"))
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(cookieParser())
app.use(session({
	secret: process.env.LETZ_SECRET,
  resave: true,
  saveUninitialized: true
}))
app.use(passport.initialize())
app.use(passport.session())
app.use("/public", express.static(__dirname + "/public"))

// API routes.
var userRoutes = require("./routes/userRoutes.js")
app.use("/api/users", userRoutes)

// Frontend routes.
app.get("*", function(req, res) {
  // res.render("index", {currentUser: req.user})
  res.sendFile(__dirname + "/views/index.html")
})

// WebSocket callbacks.
io.on("connection", function(socket) {
  console.log("A user connected.")
})

//web socket chat
app.get('/', function(req, res){
  res.sendfile('/views/chat.html');
});

//sockets chat connection
io.on('connection', function(socket){
  console.log('a user connected')
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
});

// Environment port.
var port = process.env.PORT || 3000

httpServer.listen(port, function() {
  console.log("Server running on port " + port + ".")
})
