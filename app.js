// requirments

const express = require("express");
const mongoose=require("mongoose");
const dotnev = require("dotenv");

// configs
dotnev.config();
const app = express();


// DB Connection
const dbLink = `mongodb+srv://${process.env.db_user}:${process.env.password}@bookres.uiel5v2.mongodb.net/?retryWrites=true&w=majority&appName=BookRes`

mongoose.connect(dbLink)
.then(function(){
    console.log("DB Connected");
});


const userRouter = require("./router/userRouter");

app.use(express.json());

app.use("/api/auth/",userRouter);

app.listen(3000,()=>{
    console.log("Server started sucsessfully");
})