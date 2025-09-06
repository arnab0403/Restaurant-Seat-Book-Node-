const mongoose = require("mongoose");


const restaurant = {
  name: {
    type: String,
    required: true,
  },
  description: { 
    type: String 
  },
  place: {
    type: String,
    required: true,
  },
  openTime: { 
    type: String 
  },
  menu: [
    {
      item: { type: String, required: true },
      price: { type: Number, required: true },
      description: { type: String }
    }
  ],
  coordinates: {
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true }
  },
  slotTimes: [
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
  imageUrl:{
    type:String
  }
};

const restaurantSchema = new mongoose.Schema(restaurant);

const RestaurantModel = mongoose.model("Restaurant",restaurantSchema); 

module.exports = RestaurantModel;