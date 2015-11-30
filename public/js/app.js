// Retrieve current user document and save to variable.
var currentUser
$.get("/api/users/current", function(user) {
  currentUser = user
})

function getName(user) {
  var name = (user.local.first_name + " " + user.local.last_name) || user.facebook.name
  return name
}

$("#menu").load("/public/views/partials/menu.html")

// To load landing page if no current user, and map otherwise.
if (!currentUser) {
  $("#container").load("/public/views/landing.html", function(response, status) {
    // If landing page loads, load login and signup buttons.
    if (status === "success") {
      loadLoginSignup()
    // If landing page fails to load, log the failure to console.
    } else if (status === "error") {
      console.log("Unable to load landing.html.")
    }
  })
} else {
  $("#container").load("/public/views/map.html", function(response, status) {
    // If map page loads, generate user map.
    if (status === "success") {
      generateMap()
    // If map page fails to load, log the failure to console.
    } else if (status === "error") {
      console.log("Unable to load map.html.")
    }
  })
}
