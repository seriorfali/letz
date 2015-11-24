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
  , http = require("http")
    // To allow HTTP to be bound to same port as WebSockets.
  , httpServer = http.Server(app)
    // To have provider of WebSockets connection to client listen at same port as HTTP.
  , webSocketsProvider = require("socket.io").listen(httpServer)
  , yelp           = require('./config/yelp.js');

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

// Database connection.
mongoose.connect("mongodb://tripleS:uiop3!map@ds057214.mongolab.com:57214/letz-app")

// API routes.
var userRoutes = require("./routes/userRoutes.js")
app.use("/api/users", userRoutes)

// Frontend routes.
app.get("*", function(req, res) {
  // res.render("index", {currentUser: req.user})
  res.sendFile(__dirname + "/views/index.html")
})

// WebSocket callbacks.
webSocketsProvider.on("connection", function(socket) {
  //console.log(webSocketsProvider)
  console.log("A user connected.");
  socket.on('sendchat', function (data) {
    webSocketsProvider.sockets.emit('updatechat', data);


		// we tell the client to execute 'updatechat' with 2 parameters

	});
})

//YELP API!
app.post('/api/search', function(req, res){
  yelp.search({term: req.body.term, limit: 1, ll: req.body.ll})
    .then(function (data) { //just runnin' that for loop all day long!
      for (var i = 0; i < data.businesses.length; i++){
        console.log(data.businesses[i].name);
        console.log(data.businesses[i].url);
        console.log(data.businesses[i].location);
      }
      console.log(data.businesses)
      res.json(data.businesses)
    })
  .catch(function (err) {
    console.error(err);
  });
})

// Environment port.
var port = process.env.PORT || 3000

httpServer.listen(port, function() {
  console.log("Server running on port " + port + ".")
})
