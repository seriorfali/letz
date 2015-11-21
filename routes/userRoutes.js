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

userRouter.route("/login")
  .post(usersController.login)

module.exports = userRouter
