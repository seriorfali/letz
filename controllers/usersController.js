var User = require('../models/User.js')

//index shows all the users
function index(req, res) {
  User.find({},function(err, users){
    if(err) throw err
    res.json(users)
  })
}

function show(req, res) {
  User.find({email: req.params.email}, function(err,user){
    if(err) throw err
    res.json(user)
  })
}

//need to create action to show a single user
function create(req, res) {
  passport.authenticate("local-signup", {
    successRedirect: "/",
    failureRedirect: "/",
  })
}

function update(req, res) {
  User.findOneAndUpdate({_id: req.params.id}, req.body.User, {new: true},
  function(err, user){
    if (err) console.log(err)
    res.json(user)
  })
}

function destroy(req,res) {
  User.findOneAndRemove({_id: req.params.id}, function(err){
    if (err) console.log(err)
    res.json({success: true, message: 'User destroyed.'})
    res.redirect('/')
  })
}

function login(req, res) {
  passport.authenticate("local-login", {
    successRedirect: "/",
    failureRedirect: "/",
    failureFlash: true
  })
}

function fbAuth(req, res) {
  passport.authenticate("facebook", {scope: ["email"]})
}

function fbAuthCallback(req, res) {
  passport.authenticate("facebook", {
    successRedirect: "/",
    failureRedirect: "/"
  })
}

function logout(req, res) {
  req.logout()
  res.redirect("/")
}

module.exports = {
  showUsers: index,
  addUser: create,
  showUser: show,
  updateUser: update,
  destroyUser: destroy,
  login: login,
  fbAuth: fbAuth,
  fbAuthCallback: fbAuthCallback,
  logout: logout
}
