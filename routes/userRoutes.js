var express = require("express")
  , userRouter = express.Router()
  , usersController = require("../controllers/usersController.js")

userRouter.post("/login", usersController.login)

userRouter.get("/current", usersController.showCurrentUser)

userRouter.get("/logout", usersController.logout)

// Facebook routes.
userRouter.get("/auth/facebook", usersController.fbAuth)

userRouter.get("/auth/facebook/callback", usersController.fbAuthCallback)

userRouter.route("/")
  .get(usersController.showUsers)
  .post(usersController.addUser)

userRouter.route("/:id")
  .get(usersController.showUser)
  .put(usersController.updateUser)
  .delete(usersController.destroyUser)

module.exports = userRouter
