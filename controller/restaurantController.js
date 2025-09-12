const RestaurantModel = require("../model/restaurantModel.js");


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


const getAllRestaurants= async (req,res) =>{
    try {
        const restaurants=await RestaurantModel.find();

        if (restaurants.length===0) {
            return res.status(404).json({
                message:"No Restaurants found",
                status:"failed"
            })
        }

        res.status(200).json({
            message:"Restaurants deatils fetched",
            status:"success",
            restaurants:restaurants
        })


    } catch (error) {
        console.error("Error in get-All-Restaurants API (line 64):", error);
        res.status(500).json({
        message: "Internal Server Error",
        status: "failed"
        });
    }
}

const getRestaurantsDetailsById=async(req,res)=>{
    const {id} = req.params;
    try {
        const response=RestaurantModel.findById(id);

        if (!response) {
            
        }
    } catch (error) {
        console.error("Error in get-Restaurants-Details-By-Id API (line 77):", error);
        res.status(500).json({
        message: "Internal Server Error",
        status: "failed"
        });
    }
}


module.exports={addRestaurant,getAllRestaurants,getRestaurantsDetailsById}