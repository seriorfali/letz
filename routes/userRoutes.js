//user routes
var express      = require('express')
,   passport     = require('passport')
,   userRouter   = express.Router();

userRouter.route('/login')
  .get(function(req, res){
    res.render('login', {message: req.flash('loginMessage')});
  })
