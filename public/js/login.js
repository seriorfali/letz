$("loginSubmit").click(function(evt) {
  evt.preventDefault()
  $.post("/api/users/login", {
    email: $("#signupEmail").val()
    password: $("#signupPassword").val()
  })
})
