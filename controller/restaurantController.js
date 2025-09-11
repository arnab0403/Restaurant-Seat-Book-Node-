const RestaurantModel = require("../model/restaurantModel");


const addRestaurant =async (req,res) =>{
    try {
        const restaurant = req.body;
        const {
        name,
        description,
        address,
        openTime,
        menu,
        coordinates,
        slotTimes,
        totalSeats
        } = restaurant;
        console.log(req.body);
  
        // validate required fields
        if (!name || !address || !coordinates || !totalSeats) {
        return res.status(400).json({
            message: "Missing required fields",
            status: "failed"
        });
        }

        const newRestaurant = await RestaurantModel.create(restaurant);
        
        res.status(201).json({
        message: "Restaurant created successfully",
        status: "success",
        restaurant: newRestaurant
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
        message: "Internal Server Error",
        status: "failed"
        });
    }
}



module.exports={addRestaurant}