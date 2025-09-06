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
    phone: { type: String },
    role: { 
        type: String, 
        enum: ["user", "admin"], 
        default: "user" 
    }
}
const userSchema = new mongoose.Schema(user);

const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;
