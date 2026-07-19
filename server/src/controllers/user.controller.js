import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js"
import { User } from "../models/user.model.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js";

const generateAccessAndRefreshTokens = async(userId) => {
    try{
        const user = await User.findById(userId)
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        user.refreshToken = refreshToken
        await user.save({ validateBeforeSave: false})

        return {accessToken, refreshToken}

    } catch(error) {
        throw new ApiError(500, "something went wrong while generating refresh and access token")
    }

}

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

const loginUser = asyncHandler( async (req, res) => {

    const { email , phoneNumber, password} = req.body;

    if(!phoneNumber && !email){
        throw new ApiError(400, "phoneNumber or email is required")
    }
    const user = await User.findOne({
       $or:[ {phoneNumber}, {email} ] 
})

    if(!user){
        throw new ApiError(404, "user doesn't exist")
    }

    const isPasswordValid = await user.isPasswordCorrect(password)

        if(!isPasswordValid){
        throw new ApiError(401, "invalid user credentials")
    }

    const {accessToken, refreshToken } = await generateAccessAndRefreshTokens(user._id)

    const loggedInUser = await User.findById(user._id).
    select("-password -refreshToken")

    const options = {
        httpOnly: true,
        secure: true
    }

    return res.status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
        new ApiResponse(
            200,
            {
               user: loggedInUser, accessToken, refreshToken 
            },
            "User logged In Successfully"
        )
    )
})

const logoutUser = asyncHandler(async(req, res) =>{
   await User.findByIdAndUpdate(
       req.user._id,
       {
        $set: {
            refreshToken: undefined
        }
       },
       {
         new: true
       } 
    )

        const options = {
        httpOnly: true,
        secure: true
    }

    return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User logged Out"))
    
})


export {registerUser, loginUser, logoutUser};