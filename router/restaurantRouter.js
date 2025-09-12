const express = require("express");
const { addRestaurant,getAllRestaurants,getRestaurantsDetailsById } = require("../controller/restaurantController");
 
const restaurantRouter = express.Router();

restaurantRouter
    .post("/add",addRestaurant)
    .get("/",getAllRestaurants)
    .get("/:id",getRestaurantsDetailsById);


module.exports=restaurantRouter;