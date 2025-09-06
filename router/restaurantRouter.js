const express = require("express");
const { addRestaurant } = require("../controller/restaurantController");
 
const restaurantRouter = express.Router();

restaurantRouter
    .post("/add",addRestaurant);


module.exports=restaurantRouter;