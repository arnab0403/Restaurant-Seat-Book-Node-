const express = require("express");
const userRouter = express.Router();
const {signUp,login}=require("../controller/userController");

userRouter
    .post("/signup",signUp)
    .post("/login",login)

module.exports=userRouter;