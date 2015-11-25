function signup() {
  $("signupSubmit").click(function(evt) {
    evt.preventDefault()
    $.post("/api/users", {
      first_name: $("#signupFirstName").val(),
      last_name: $("#signupLastName").val(),
      email: $("#signupEmail").val(),
      dob: $("#signupDob").val(),
      password: $("#signupPassword").val()
    })
  })
}
