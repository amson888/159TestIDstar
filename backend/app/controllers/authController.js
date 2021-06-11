const authService = require("../services/authService")
const authRouter = require("express").Router()

authRouter.post("/generateToken", authService.generateToken)

module.exports = authRouter