const express = require("express");
const {
  registerUser,
  LogInUser,
  logOut,
} = require("../controllers/userControllers");
// const { userAuthVerification } = require("../middleware/authMiddleware");
const { userAuthVerification1 } = require("../middleware/singleAuth");

const userRouter = express.Router();

userRouter.post("/signup", registerUser);
userRouter.post("/signin", LogInUser);
userRouter.get("/auth", userAuthVerification1);
userRouter.post("/logout", logOut);

module.exports = userRouter;
