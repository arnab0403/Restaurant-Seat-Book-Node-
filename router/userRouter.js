const express = require("express");
const userRouter = express.Router();
const {signUp,login,userDetailsByToken,logout, verifyOtp}=require("../controller/userController");

userRouter
    .post("/signup",signUp)
    .post("/login",login)
    .get("/userjwt",userDetailsByToken)
    .post("/logout",logout)
    .post("/verifyotp",verifyOtp)
    
module.exports=userRouter;