import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js"
import { User } from "../models/user.model.js"
import { uploadOnCloudinary, deleteFromCloudinary } from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js";
import { CaretakerProfile } from "../models/caretaker.model.js";
import { ElderlyProfile } from "../models/elderly.model.js";
import mongoose from "mongoose";

const generateAccessAndRefreshTokens = async (userId) => {
    try {
        const user = await User.findById(userId)
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        user.refreshToken = refreshToken
        await user.save({ validateBeforeSave: false })

        return { accessToken, refreshToken }

    } catch (error) {
        throw new ApiError(500, "something went wrong while generating refresh and access token")
    }

}

const registerUser = asyncHandler(async (req, res) => {
    const { firstName, lastName, address, password, email,
        phoneNumber, whatsappNumber, aboutMe, role, dob, gender } = req.body;

    if (
        [firstName, lastName, address, password, email,
            phoneNumber, whatsappNumber, aboutMe, role, dob, gender].some((field) =>
                field?.trim() === "")
    ) {
        throw new ApiError(400, "All fields are required")
    }

    if (role === "admin") {
        throw new ApiError(403, "you can't register as admin")
    }

    const existedUser = await User.findOne({
        $or: [{ phoneNumber }, { email }, { whatsappNumber }]
    })

    if (existedUser) {
        throw new ApiError(409, "User with email, phoneNumber or whatsappNumber already exists");
    }
    const avatarLocalPath = req.file?.path;

    if (!avatarLocalPath) {
        throw new ApiError(400, "Avatar file is required")
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath)

    if (!avatar) {
        throw new ApiError(400, "Failed to upload avatar")
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

    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registering the user")
    }

    return res.status(201).json(
        new ApiResponse(201, createdUser, "User registered successfully")
    )

})

const loginUser = asyncHandler(async (req, res) => {

    const { email, phoneNumber, password } = req.body;

    if (!phoneNumber && !email) {
        throw new ApiError(400, "phoneNumber or email is required")
    }
    const user = await User.findOne({
        $or: [{ phoneNumber }, { email }]
    })

    if (!user) {
        throw new ApiError(404, "user doesn't exist")
    }

    const isPasswordValid = await user.isPasswordCorrect(password)

    if (!isPasswordValid) {
        throw new ApiError(401, "invalid user credentials")
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(user._id)

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

const logoutUser = asyncHandler(async (req, res) => {
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

const refreshAccessToken = asyncHandler(async (req, res) => {
    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken

    if (incomingRefreshToken) {
        throw new ApiError(401, "unauthorized request")
    }

    try {
        const decodedjwt = jwt.verify(
            incomingRefreshToken,
            process.env.REFRESH_TOKEN_SECRET
        )

        const user = await User.findById(decodedToken?._id)

        if (incomingRefreshToken !== user?.refreshToken) {
            throw new ApiError(401, "Refresh token is expired or used")
        }

        const { accessToken, newRefreshToken } = await generateAccessAndRefreshTokens(user.id)

        return res
            .status(200)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", newRefreshToken, options)
            .json(
                new ApiResponse(
                    200,
                    { accessToken, refreshToken: newRefreshToken },
                    "Access token refreshed"
                ))

    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid refresh token")

    }
})

const changeCurrentPassword = asyncHandler(async (req, res) => {
    const { oldPassword, newPassword } = req.body

    const user = await User.findById(req.user._id)
    const isPasswordCorrect = await user.isPasswordCorrect(oldPassword)

    if (!isPasswordCorrect) {
        throw new ApiError(400, "Invalid Password")
    }

    user.password = newPassword
    await user.save({ validateBeforeSave: false })

    return res.status(200)
        .json(new ApiResponse(200, {}, "Password changed successfully"))
})

const getCurrentUser = asyncHandler(async (req, res) => {

    let profile
    if (req.user.role === "caretaker") {
        profile = await CaretakerProfile.aggregate([
            {
                $match: {
                    userId: new mongoose.Types.ObjectId(req.user._id)
                }
            },
            {
                $lookup: {
                    from: "timeslots",
                    localField: "userId",
                    foreignField: "userId",
                    as: "timeslots",
                    pipeline: [
                        {
                            $project: {
                                userId: 0
                            }
                        }
                    ]
                }
            },
            {
                $project: {
                    userId: 0
                }
            },
        ])

    } else if (req.user.role === "elderly") {
        profile = await ElderlyProfile.findOne({ userId: req.user._id })
    }
    const user = { ...req.user.toObject(), profile }

    return res
        .status(200)
        .json(
            new ApiResponse(200, user, "current user fetched successfully")
        )
})

const getUserById = asyncHandler(async (req, res) => {

    const { userId } = req.params

    let user = await User.findById(userId).select("-password -refreshToken")

    if (!user) {
        throw new ApiError(404, "user not found")
    }

    let profile
    if (user.role === "caretaker") {
         profile = await CaretakerProfile.aggregate([
            {
                $match: {
                    userId: new mongoose.Types.ObjectId(req.user._id)
                }
            },
            {
                $lookup: {
                    from: "timeslots",
                    localField: "userId",
                    foreignField: "userId",
                    as: "timeslots",
                    pipeline: [
                        {
                            $project: {
                                userId: 0
                            }
                        }
                    ]
                }
            },
            {
                $project: {
                    userId: 0
                }
            },
        ])
    } else if (user.role === "elderly") {
        profile = await ElderlyProfile.findOne({ userId: userId })
    }

    const result = { user, profile }

    res
        .status(200)
        .json(
            new ApiResponse(200, result, "user profile fetched successfully")
        )
})

const updateAccountDetails = asyncHandler(async (req, res) => {
    const { firstName, lastName, address, email, whatsappNumber, aboutMe, dob, gender } = req.body

    if (!(firstName || lastName || address || email || whatsappNumber || aboutMe || dob || gender)) {
        throw new ApiError(400, "Atleast one field is required")
    }

    const user = await User.findByIdAndUpdate(
        req.user?._id,
        {
            $set: {
                firstName,
                lastName,
                address,
                email,
                whatsappNumber,
                aboutMe,
                dob,
                gender
            }
        },
        { new: true }

    ).select("-password")

    return res
        .status(200)
        .json(new ApiResponse(200, user, "Account details updated successfully"))
})

const updateUserAvatar = asyncHandler(async (req, res) => {
    const avatarLocalPath = req.file?.path

    if (!avatarLocalPath) {
        throw new ApiError(400, "Avatar file is missing")
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath)

    if (!avatar.url) {
        throw new ApiError(400, "Error while uploading on avatar")

    }

    await deleteFromCloudinary(req.user.avatar)

    const user = await User.findByIdAndUpdate(
        req.user?._id,
        {
            $set: {
                avatar: avatar.url
            }
        },
        { new: true }
    ).select("-password")

    return res
        .status(200)
        .json(
            new ApiResponse(200, user, "Avatar image updated successfully")
        )
})

export {
    registerUser,
    loginUser,
    logoutUser,
    refreshAccessToken,
    changeCurrentPassword,
    getCurrentUser,
    updateAccountDetails,
    updateUserAvatar,
    getUserById
}