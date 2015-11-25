var passport = require('passport')
  , passportConfig = require("../config/passport.js")
  , User = require('../models/User.js')

// To return all user documents.
function index(req, res) {
  User.find({},function(err, users){
    if(err) throw err
    res.json(users)
  })
}

// To return a single user document.
function show(req, res) {
  User.findById(req.params.id, function(err, user) {
    if(err) throw err
    res.json(user)
  })
}

// To add user document to database.
var add = passport.authenticate("local-signup", {
  successRedirect: "/",
  failureRedirect: "/",
})

// To update user document.
function update(req, res) {
  User.findOneAndUpdate({_id: req.params.id}, req.body, {new: true},
  function(err, user) {
    if(err) throw err
    res.json(user)
  })
}

// To delete user document from database.
function destroy(req, res) {
  User.findOneAndRemove({_id: req.params.id}, function(err) {
    if(err) throw err
    res.redirect("/")
  })
}

// To authenticate login attempt.
var login = passport.authenticate("local-login", {
  successRedirect: "/",
  failureRedirect: "/",
  failureFlash: true
})

var fbAuth = passport.authenticate("facebook", {scope: ["email"]})

var fbAuthCallback = passport.authenticate("facebook", {
  successRedirect: "/",
  failureRedirect: "/"
})

function showCurrentUser(req, res) {
  console.log(req.user)
  res.json(req.user)
}

function logout(req, res) {
  req.logout()
  res.redirect("/")
  User.currentLocation = {}
  User.currentStatus = ""
}

module.exports = {
  showUsers: index,
  addUser: add,
  showUser: show,
  updateUser: update,
  destroyUser: destroy,
  login: login,
  fbAuth: fbAuth,
  fbAuthCallback: fbAuthCallback,
  showCurrentUser: showCurrentUser,
  logout: logout
}
