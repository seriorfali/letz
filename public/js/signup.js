function signup() {
  console.log("we are in the function")
  $("#signupSubmit").click(function(evt) {
    console.log("blalblas")
    evt.preventDefault()
    $.ajax({
      url: "/api/users",
      // specify content type etc
      type: "POST",
      contentType: 'json',
      data: {
        first_name: $("#signupFirstName").val(),
        last_name: $("#signupLastName").val(),
        email: $("#signupEmail").val(),
        dob: $("#signupDob").val(),
        password: $("#signupPassword").val()
      },
      success: function(user){
        console.log(user)
        // append the users name to the header

      }
    })

    /*
    "/api/users", {
      first_name: $("#signupFirstName").val(),
      last_name: $("#signupLastName").val(),
      email: $("#signupEmail").val(),
      dob: $("#signupDob").val(),
      password: $("#signupPassword").val()
    }

    */
  })
}
