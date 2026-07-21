import mongoose, {Schema} from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
        index: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        index: true
    },
    address: {
        type: String,
        required: true,
        trim: true
    },
    avatar: {
        type: String, //cloudinary url
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    phoneNumber: {
        type: String, 
        required: true,
        unique: true
    }, 
    whatsappNumber: {
        type: String, 
        required: true,
        unique: true
    },
    aboutMe: {
        type: String, 
        trim: true
    },   
    password:{
        type: String,
        required: [true, "password is required"]
    },
    role:{   
        type: String,
        enum: ["elder", "guardian", "caretaker"],
        required: true,
    },
    gender: {   
        type: String,
          enum: ["male", "female", "other"],
        required: true
    },
    dob:{
        type: String,
        required: true,
        trim: true
    },
    status: {      
        type: String, 
        enum: ["active", "banned"],
        required: true,
    }, 
    refreshToken:{
        type: String
    }
},{timestamps: true})

userSchema.pre("save", async function(){
    if(!this.isModified("password")) return;

    this.password = await bcrypt.hash(this.password, 10)
})

userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password);
}

userSchema.methods.generateAccessToken = function(){
   return jwt.sign({
        _id: this._id,
        email: this.email,
        phoneNumber: this.phoneNumber
    },
process.env.ACCESS_TOKEN_SECRET,
{
    expiresIn: process.env.ACCESS_TOKEN_EXPIRY
}
)}
userSchema.methods.generateRefreshToken = function(){
   return jwt.sign({
        _id: this._id,
    },
process.env.REFRESH_TOKEN_SECRET,
{
    expiresIn: process.env.REFRESH_TOKEN_EXPIRY
}
)}




export const User = mongoose.model("User", userSchema)