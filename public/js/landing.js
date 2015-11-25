function loadLoginSignup() {
  $("#container").load("../../views/partials/loginSignup.html")
}

$("#loginButton").click(function() {
  $(this).hide()
  $("#signupButton").hide()
  $("#container").load("../../views/partials/login.html")
})

$("#signupButton").click(function() {
  $(this).hide()
  $("#loginButton").hide()
  $("#container").load("../../views/partials/signup.html")
})
