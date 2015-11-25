function loadLoginSignup() {
  $("#buttonsForms").load("/public/views/partials/loginSignup.html", function(response, status) {
    if (status === "success") {
      $("#loginButton").click(function() {
        $("#buttonsForms").load("/public/views/partials/login.html")
      })

      $("#signupButton").click(function() {
        $("#buttonsForms").load("/public/views/partials/signup.html", function(response, status) {
          if (status === "success") {
          console.log('its succes')
           signup()
         }
          // } else if (status === "failure") {
          //   console.log("Unable to load signup form.")
          // }
          $("signupSubmit").click(function(evt) {
            evt.preventDefault()
            console.log("we are in the function")
            $.post("/api/users", {
              first_name: $("#signupFirstName").val(),
              last_name: $("#signupLastName").val(),
              email: $("#signupEmail").val(),
              dob: $("#signupDob").val(),
              password: $("#signupPassword").val()
            })
          })
        })
      })
    } else if (status === "failure") {
      console.log("Unable to load login and signup buttons.")
    }
  })
}
