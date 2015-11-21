var express = require("express")
  , userRouter = express.Router()
  , usersController = require("../controllers/usersController.js")

userRouter.route("/users")
  .get(usersController.showUsers)
  .post(usersController.addUser)

userRouter.route("/users/:id")
  .get(usersController.showUser)
  .put(usersController.updateUser)
  .delete(usersController.destroyUser)

userRouter.route("/login")
  .post(usersController.login)

module.exports = userRouter
