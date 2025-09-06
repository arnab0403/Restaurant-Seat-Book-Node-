// requirments
const express = require("express");
const mongoose=require("mongoose");
const dotnev = require("dotenv");
const cors = require("cors");
const cookieParser= require("cookie-parser");


// configs
dotnev.config();
const app = express();


// DB Connection
const dbLink = `mongodb+srv://${process.env.db_user}:${process.env.password}@bookres.uiel5v2.mongodb.net/?retryWrites=true&w=majority&appName=BookRes`

mongoose.connect(dbLink)
.then(function(){
    console.log("DB Connected");
});

app.use(cors({
  origin: "http://localhost:5173", // frontend URL
  credentials: true                // 👈 allow cookies
}));

app.use(cookieParser());
const userRouter = require("./router/userRouter");
const restaurantRouter = require("./router/restaurantRouter");

app.use(express.json());

app.use("/api/auth/",userRouter);
app.use("/api/restaurant/",restaurantRouter);

app.listen(3000,()=>{
    console.log("Server started sucsessfully");
})