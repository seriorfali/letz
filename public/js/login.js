function login() {
  $("#loginSubmit").click(function(evt) {
    evt.preventDefault()
    $.post("/api/users/login", {
      email: $("#loginEmail").val(),
      password: $("#loginPassword").val()
    }, function() {
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
  })
}
