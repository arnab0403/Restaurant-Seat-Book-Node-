const mongoose = require("mongoose");

const user ={
    name: {
        type: String, 
        required: true
    },
    email: { 
        type: String, 
        required: true, 
        unique: true 
    },
    password: { 
        type: String,
        required: true 
    },
    phone: { 
        type: String,
        required:true 
    },
    imageUrl:{
        type:String
    },
    role: { 
        type: String, 
        enum: ["user", "admin"], 
        default: "user" 
    },
    isVerified:{
        type:Boolean,
        default:false
    },
    otp:{
        type:String,
    }
}
const userSchema = new mongoose.Schema(user);

const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;
