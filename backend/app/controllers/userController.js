const userService = require("../services/userService");
const authService = require("../services/authService");
const userRouter = require("express").Router();

userRouter.get("/", authService.tokenVerify, userService.getUser);
userRouter.get("/getUserByAccountNumber/:accountNumber", authService.tokenVerify, userService.getUserByAccountNumber);
userRouter.get("/getUserByIdentityNumber/:identityNumber", authService.tokenVerify, userService.getUserByIdentityNumber);
userRouter.post("/", authService.tokenVerify, userService.createUser);
userRouter.put("/", authService.tokenVerify, userService.updateUser);
userRouter.delete("/", authService.tokenVerify, userService.deleteUser);

module.exports = userRouter;
