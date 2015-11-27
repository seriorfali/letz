function loadLoginSignup() {
  $("#buttonsForms").load("/public/views/partials/loginSignup.html", function(response, status) {
    if (status === "success") {
      $("#loginButton").click(function() {
        $("#buttonsForms").load("/public/views/partials/login.html", function(response, status) {
          if (status === "success") {
            login()
          } else if (status === "failure") {
            console.log("Unable to load login form.")
          }
        })
      })

      $("#signupButton").click(function() {
        $("#buttonsForms").load("/public/views/partials/signup.html", function(response, status) {
          if (status === "success") {
           signup()
          } else if (status === "failure") {
            console.log("Unable to load signup form.")
          }
        })
      })
    } else if (status === "failure") {
      console.log("Unable to load login and signup buttons.")
    }
  })
}
