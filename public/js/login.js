function login() {
  $("#loginSubmit").click(function(evt) {
    evt.preventDefault()
    $.post("/api/users/login", {
      email: $("#loginEmail").val(),
      password: $("#loginPassword").val()
    })
    // If AJAX post request succeeds (user is authenticated and a session is started), load map page.
    .done(function() {
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
    .fail(function() {
      console.log("Failed to authenticate user and start session.")
    })
  })
}
