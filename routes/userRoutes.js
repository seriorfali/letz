//user routes
var express      = require('express')
,   passport     = require('passport')
,   userRouter   = express.Router();


//first we have the login route with a .get and .post method attached to it
userRouter.route('/login')
  .get(function(req, res){
    res.render('login', {message: req.flash('loginMessage')});
  })

//and now .post

  .post(passport.authenticate('local-login', {
    successRedirect: '/profile',
    failureRedirect: '/login',
    failureFlash: true
  }))
