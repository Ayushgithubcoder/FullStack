import mongoose from "mongoose";
import bcrypt from "bcryptjs"

const userSchema=new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    role:{
        type: String,
        enun:["User","admin"],
        default:"user",
    },
    isVerified:{
        type: Boolean,
         default:false
    },
    verificationToken:{
        type:String,
    },
    resetPasswordToken:{
        type:String,
    },
    resetPasswordTokenExpiry:{
        type:Date,
    },
},{
    timestamps: true
})


const User = mongoose.model("User",userSchema)

export default User