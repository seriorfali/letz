function signup() {
  $("#signupSubmit").click(function(event) {
    event.preventDefault()
    dob = new Date($("#signupDob").val())
    $.post("/api/users", {
      first_name: $("#signupFirstName").val(),
      last_name: $("#signupLastName").val(),
      email: $("#signupEmail").val(),
      dob: dob,
      password: $("#signupPassword").val()
    })
    // If AJAX post request succeeds (new user is added to database), load map page.
    .done(function(user) {
      console.log(user)
      $("#container").load("/public/views/map.html", function(response, status) {
        // If map page loads, generate user map.
        if (status === "success") {
          console.log("Trying to generate map.")
          generateMap()
        // If map page fails to load, log the failure to console.
        } else if (status === "error") {
          console.log("Unable to load map.html.")
        }
      })
    })
    // If AJAX post request fails, log error to console.
    .fail(function() {
      console.log("Failed to add user to database.")
    })
  })
}
