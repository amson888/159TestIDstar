const authController = require("../controllers/authController")
const userController = require("../controllers/userController")


module.exports = function (app) {
  app.use("/api/auth", authController)
  app.use("/api/user", userController)

}
