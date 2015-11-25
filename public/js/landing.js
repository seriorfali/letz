function loadLoginSignup() {
  $("#buttonsForms").load("/public/views/partials/loginSignup.html")

  $("#loginButton").click(function() {
    $(this).hide()
    $("#signupButton").hide()
    $("#buttonsForms").load("/public/views/partials/login.html")
  })

  $("#signupButton").click(function() {
    $(this).hide()
    $("#loginButton").hide()
    $("#buttonsForms").load("/public/views/partials/signup.html")
  })
}
