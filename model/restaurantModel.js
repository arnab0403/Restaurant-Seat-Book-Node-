const mongoose = require("mongoose");


const restaurant = {
  name: {
    type: String,
    required: true,
  },
  description: { 
    type: String,
    require:true 
  },
  state:{
    type:String,
    require:true
  },
  city: {
    type: String,
    required: true,
  },
  address:{
    type:String,
    required:true
  },
  coordinates: {
    type:String,
    required:true
  },
  openTime: { 
    type: String,
    required:true 
  },
  closeTime:{
    type:String,
    required:true
  },
  menuItems: [
    {
      menu: { type: String, required: true },
      price: { type: Number, required: true },
    }
  ],
  slotTime: [
    {
      time: { type: String, required: true },
      status: { 
        type: String, 
        enum: ["available", "unavailable"], 
        default: "available" 
      }
    }
  ],
  totalSeats: { 
    type: Number, 
    required: true 
  },
  image:[{
    type:String
  }]
};

const restaurantSchema = new mongoose.Schema(restaurant);

const RestaurantModel = mongoose.model("Restaurant",restaurantSchema); 

module.exports = RestaurantModel;
