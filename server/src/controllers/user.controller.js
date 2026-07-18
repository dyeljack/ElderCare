import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js"
import { User } from "../models/user.model.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler( async (req, res) => {
    const { firstName, lastName, address, password, email,
         phoneNumber, whatsappNumber, aboutMe, role ,dob, gender } = req.body;

    if (
        [firstName, lastName, address, password, email,
         phoneNumber, whatsappNumber, aboutMe, role, dob, gender ].some((field) =>
        field?.trim() === "")
    ){
        throw new ApiError(400, "All fields are required")
    }

    const existedUser = await User.findOne({
        $or: [{phoneNumber}, {email}, {whatsappNumber}]
    })
    
    if (existedUser){
        throw new ApiError(409, "User with email, phoneNumber or whatsappNumber already exists"); 
    }
    const avatarLocalPath = req.files?.avatar[0]?.path;

    if(!avatarLocalPath){
        throw new ApiError(400, "Avatar file is required")
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath)

    if(!avatar) {
        throw new ApiError(400, "Avatar file is requireed")
    }

    const user = await User.create({
        firstName,
        lastName,
        address,
        avatar: avatar?.url || "",
        email,
        phoneNumber,
        whatsappNumber,
        aboutMe: aboutMe || "",
        password,
        role,
        status: "active",
        dob,
        gender
    })

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if(!createdUser){
        throw new ApiError(500, "Something went wrong while registering the user")
    }

    return res.status(201).json(
        new ApiResponse(200, createdUser, "User registered successfully")
    )

} 

)

export {registerUser}