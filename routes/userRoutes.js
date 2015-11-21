//user routes
var express      = require('express')
,   passport     = require('passport')
,   userRouter   = express.Router();


//first we have the login route with a .get and .post method attached to it
userRouter.route("/login")
  .get(function(req, res) {
    res.render("login", {message: req.flash("loginMessage")});
  })
  .post(passport.authenticate("local-login", {
    successRedirect: "/profile",
    failureRedirect: "/login",
    // To use flash messages specified for errors.
    failureFlash: true
  }))

userRouter.route("/signup")
  .get(function(req, res) {
    res.render("signup", {message: req.flash("signupMessage")});
  })
  .post(passport.authenticate("local-signup", {
    successRedirect: "/profile",
    failureRedirect: "/signup",
    // To use flash messages specified for errors.
    failureFlash: true
  }))

userRouter.get("/profile", isLoggedIn, function(req, res) {
  res.render("profile", {user: req.user})
})

// Facebook routes.
userRouter.get("/auth/facebook", passport.authenticate("facebook", {scope: ["email"]}))

userRouter.get("/auth/facebook/callback", passport.authenticate("facebook", {
  successRedirect: "/profile",
  failureRedirect: "/"
}))

userRouter.get("/logout", function(req, res) {
  req.logout();
  res.redirect("/");
})

// To check if user is authenticated.
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next()
  res.redirect("/");
}

module.exports = userRouter;
