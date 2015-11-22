var express = require("express")
  , userRouter = express.Router()
  , usersController = require("../controllers/usersController.js")

userRouter.route("/")
  .get(usersController.showUsers)
  .post(usersController.addUser)

userRouter.route("/:email")
  .get(usersController.showUser)
  .put(usersController.updateUser)
  .delete(usersController.destroyUser)

userRouter.post("/login", usersController.login)

userRouter.get("/logout", usersController.logout)

// Facebook routes.
userRouter.get("/auth/facebook", usersController.fbAuth)

userRouter.get("/auth/facebook/callback", usersController.fbAuthCallback)

module.exports = userRouter
