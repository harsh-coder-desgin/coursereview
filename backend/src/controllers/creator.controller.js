import { Creator } from "../models/cretor.model.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { uploadOnCloundinary } from "../utils/cloundinary.js"
import jwt from "jsonwebtoken"
import { URL } from "url"
// import { SendEmail } from "../middlewares/auth.middlewares.js"
import { v2 as cloudinary } from "cloudinary";

//generateAccessRefreshTokens
const generateAccessRefreshTokens = async (userId) => {
    try {
        const user = await Creator.findById(userId)
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        user.refreshToken = refreshToken
        await user.save({ validateBeforeSave: false })
        return { accessToken, refreshToken }
    } catch (error) {
        throw new ApiError(500, "something went wrong while refresh and access token")
    }
}

//register-creator
const registercreator = asyncHandler(async (req, res) => {

    const { creatorname, email, password, bio } = req.body

    if (
        [creatorname, email, password, bio].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(400, "All fields (creator name, email, password, and bio) are required")
    }

    if (creatorname.trim().length < 5) {
        throw new ApiError(400, "Creator name must be at least 5 characters long")
    }

    if (password.trim().length < 8) {
        throw new ApiError(400, "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character")
    }

    const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

    if (!strongPasswordRegex.test(password)) {
        throw new ApiError(400, "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character");
    }

    if (bio.length < 25) {
        throw new ApiError(400, "Bio should be at least 25 characters long to help users understand who you are")
    }

    const existeduser = await Creator.findOne({
        $or: [{ email }, { creatorname }]
    })

    if (existeduser) {
        throw new ApiError(400, "A user with this email or creator name already exists")
    }

    const profileLocalPath = req.files?.profile?.[0];

    if (!profileLocalPath) {
        throw new ApiError(400, "Profile image is required")
    }

    const profile = await uploadOnCloundinary(profileLocalPath, "creatorproflie")

    if (!profile) {
        throw new ApiError(400, "Failed to upload profile image. Please try again")
    }

    profileLocalPath.buffer = null;
    const verficationCode = Math.floor(1000 + Math.random() * 9000).toString()
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes from now

    const user = await Creator.create({
        creatorname: creatorname.toLowerCase(),
        email: email.toLowerCase(),
        password,
        profile: profile.url,
        profilePublicId: profile.public_id,
        verficationCode,
        expiresAt,
        bio: bio
    })

    if (!user) {
        throw new ApiError(500, "Failed to create Creator. Please try again.");
    }

    // SendEmail(user.email, verficationCode).catch(console.error);

    const createdUser = await Creator.findById(user._id).select(
        "-password -refreshToken"
    )

    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while creating your account. Please try again")
    }

    return res.status(201).json(
        new ApiResponse(200, createdUser, "Creator registered successfully. Please verify your email to activate your account")
    )
})

//verfiy-email
const verfiyemail = asyncHandler(async (req, res) => {

    const { code } = req.body

    if (!code || code.trim() === "" || code.length !== 4) {
        throw new ApiError(400, "Verification code is required")
    }

    const users = await Creator.findOne({
        verficationCode: code,
        expiresAt: { $gt: new Date() }
    })

    if (!users) {
        throw new ApiError(400, "Invalid or expired verification code. Please try again")
    }

    if (users.expiresAt < new Date()) {
        throw new ApiError(400, "Your verification code has expired. Please request a new one")
    }

    users.verficationCode = undefined
    users.isVerified = true
    users.expiresAt = undefined

    await users.save().catch(() => {
        throw new ApiError(500, "Something went wrong while verifying your email. Please try again later.");
    });

    const { refreshToken, accessToken } = await generateAccessRefreshTokens(users._id)
    const loginUser = await Creator.findById(users._id).select("-password -refreshToken")

    const options = {
        httpOnly: true,
        secure: true
    }
    return res.status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
            new ApiResponse(
                200, {
                users: loginUser, accessToken,
                refreshToken
            },
                "Login successfully"
            )
        )
})

//resendotp
const resendotp = asyncHandler(async (req, res) => {

    const { email } = req.body

    if (!email || email.trim() === "") {
        throw new ApiError(400, "Email is required to resend the verification code.");
    }

    const newverficationCode = Math.floor(1000 + Math.random() * 9000).toString()
    const newExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    const users = await Creator.findOne({
        email: email
    })

    if (!users) {
        throw new ApiError(400, "No account found for the provided details")
    }

    users.verficationCode = newverficationCode
    users.expiresAt = newExpiry

    // SendEmail(users.email, newverficationCode).catch(() => {
    //     throw new ApiError(500, "Unable to send verification code. Please try again later.");
    // });

    await users.save().catch(() => {
        throw new ApiError(500, "Something went wrong while generating a new verification code.");
    });

    return res
        .status(201)
        .json(new ApiResponse(200, "A new verification code has been sent to your email"))
})

//login
const logincreator = asyncHandler(async (req, res) => {

    const { email, password } = req.body

    if (
        [email, password].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(400, "Email and password are required")
    }

    if (password.trim().length < 8) {
        throw new ApiError(400, "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character")
    }

    const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

    if (!strongPasswordRegex.test(password)) {
        throw new ApiError(400, "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character");
    }

    const users = await Creator.findOne({
        $or: [{ email }]
    })

    if (!users) {
        throw new ApiError(400, "No account matches the provided email and creator name")
    }

    if (users.email !== email) {
        throw new ApiError(400, "The email or creator name is incorrect.");
    }
    const checkpasswordiscorrect = await users.isPasswordCorrect(password)

    if (!checkpasswordiscorrect) {
        throw new ApiError(400, "Incorrect password. Please try again")
    }

    const { refreshToken, accessToken } = await generateAccessRefreshTokens(users._id)
    const loginUser = await Creator.findById(users._id).select("-password -refreshToken")

    const options = {
        httpOnly: true,
        secure: true
    }
    return res.status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
            new ApiResponse(
                200, {
                users: loginUser, accessToken,
                refreshToken
            },
                "Login successfully"
            )
        )
})

//logout
const logoutcreator = asyncHandler(async (req, res) => {

    const userId = req.users._id

    if (!userId) {
        throw new ApiError(401, "User authentication failed. Please log in again.");
    }

    await Creator.findByIdAndUpdate(
        userId, {
        $set: {
            refreshToken: ""
        }
    },
        {
            new: true
        }
    ).catch(() => {
        throw new ApiError(500, "Something went wrong while logging out. Please try again.");
    });

    const options = {
        httpOnly: true,
        secure: true
    }

    return res
        .status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json(new ApiResponse(200, {}, "User logged out successfully"))
})

//refreshaccesstoken
const refreshaccesstoken = asyncHandler(async (req, res) => {

    const incomeingRefreshToken = req.cookies.refreshToken || req.body.refreshToken

    if (!incomeingRefreshToken) {
        throw new ApiError(400, "Refresh token is missing. Please log in again")
    }

    try {
        const decodeedtoken = jwt.verify(
            incomeingRefreshToken,
            process.env.REFRESH_TOKEN_SECRET
        )

        const users = await Creator.findById(decodeedtoken?._id)

        if (!users) {
            throw new ApiError(401, "Session is invalid or has expired. Please log in again.")
        }

        if (incomeingRefreshToken !== users.refreshToken) {
            throw new ApiError(401, "Session expired or token is invalid. Please log in again")
        }

        const options = {
            httpOnly: true,
            secure: true
        }

        const { accessToken, refreshToken } = await generateAccessRefreshTokens(users._id)

        return res
            .status(200)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", refreshToken, options)
            .json(
                new ApiResponse(
                    200,
                    { accessToken },
                    "Access token refreshed successfully"
                )
            )
    } catch (error) {
        throw new ApiError(401, "Invalid or expired refresh token. Please log in again")
    }
})

//changecurrentpassword
const changecurrentpassword = asyncHandler(async (req, res) => {

    const { currentPassword, newPassword, confirmPassword } = req.body

    if (
        [currentPassword, newPassword, confirmPassword].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(400, "Both old and new passwords are required")
    }

    const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

    if (!strongPasswordRegex.test(currentPassword)) {
        throw new ApiError(400, "OldPassword must be at least 8 characters long and include uppercase, lowercase, number, and special character");
    }

    if (!strongPasswordRegex.test(newPassword)) {
        throw new ApiError(400, "NewPassword must be at least 8 characters long and include uppercase, lowercase, number, and special character");
    }

    if (!strongPasswordRegex.test(confirmPassword)) {
        throw new ApiError(400, "ConfirmPassword must be at least 8 characters long and include uppercase, lowercase, number, and special character");
    }

    if (confirmPassword !== newPassword) {
        throw new ApiError(400, "New password cannot match ConfirmPassword")
    }

    if (currentPassword === newPassword) {
        throw new ApiError(400, "New password must be different from the old password")
    }

    const users = await Creator.findById(req.users?._id)
    const ispasswordcorrect = await users.isPasswordCorrect(currentPassword)

    if (!ispasswordcorrect) {
        throw new ApiError(400, "Old password is incorrect")
    }

    users.password = newPassword
    await users.save({ validateBeforeSave: false })

    return res
        .status(200)
        .json(new ApiResponse(200, {}, "Password changed successfully"))
})

//current-creatoruser
const getcurrentuser = asyncHandler(async (req, res) => {
    return res
        .status(200)
        .json(new ApiResponse(
            200,
            req.users,
            "User fetched Successfully"))
})

//edit-creator-profile
const editprofilcreator = asyncHandler(async (req, res) => {
    const oldProfileId = req.users?.profilePublicId; 
    const uploadedFiles = req.files;

    if (!uploadedFiles || !uploadedFiles.profile || uploadedFiles.profile.length === 0) {
        throw new ApiError(400, "Profile image is required. Please upload a valid file");
    }

    const profileFile = uploadedFiles.profile[0]; 
    const imageName = profileFile.originalname;

    if (oldProfileId) {
        const oldImageName = oldProfileId.slice(15); 
        const newImageName = imageName.slice(0, -4);

        if (oldImageName === newImageName) {
            throw new ApiError(400, "Profile image is already uploaded");
        }
    }

    const currentUser = await Creator.findById(req.users?._id);
    if (currentUser?.profilePublicId) {
        await cloudinary.uploader.destroy(currentUser.profilePublicId);
    }

    const profile = await uploadOnCloundinary(profileFile, "creatorprofile");

    if (!profile?.url) {
        throw new ApiError(400, "Failed to upload profile image. Please try again");
    }

    const updatedUser = await Creator.findByIdAndUpdate(
        req.users?._id,
        {
            $set: {
                profile: profile.url,
                profilePublicId: profile.public_id,
            },
        },
        { new: true }
    ).select("-password -refreshToken");

    return res
        .status(200)
        .json(new ApiResponse(200, updatedUser, "Profile updated successfully"));
});

//add creator-socialmedia
const addsocialmedia = asyncHandler(async (req, res) => {

    function isValidSocialProfileURL(url, platform) {

        try {
            const myURL = new URL(url);
            const pathSegments = myURL.pathname.split("/").filter(Boolean); 
            if (platform === "linkedin") {
                return (
                    myURL.hostname === "www.linkedin.com" &&
                    pathSegments[0] === "in" &&
                    pathSegments.length === 2 &&
                    pathSegments[1].length >= 3 &&
                    myURL.protocol === 'https:'
                );
            }

            if (platform === "youtube") {
                return (
                    myURL.hostname === "www.youtube.com" &&
                    myURL.pathname.startsWith("/@") &&
                    pathSegments[0].startsWith("@") &&
                    pathSegments.length === 1 &&
                    pathSegments[0].length > 1 &&
                    myURL.protocol === 'https:'
                );
            }

            if (platform === "github") {
                console.log(myURL);
                return (
                    myURL.hostname === "github.com" &&
                    pathSegments.length === 1 &&
                    pathSegments[0].length >= 4 &&
                    myURL.protocol === 'https:'
                );
            }
            return false;
        } catch (error) {
            return false;
        }
    }

    const { linkedin, youtube, github } = req.body

    if (
        [linkedin, youtube, github].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(400, "All fields are required")
    }

    const vaildornotlinkedin = isValidSocialProfileURL(linkedin, "linkedin")
    const vaildornotyoutube = isValidSocialProfileURL(youtube, "youtube")
    const vaildornotgithub = isValidSocialProfileURL(github, "github")

    if (vaildornotlinkedin === false || vaildornotyoutube === false || vaildornotgithub === false) {
        throw new ApiError(400, "One or more social media links are invalid URLs.");
    }

    const users = await Creator.findByIdAndUpdate(
        req.users?._id,
        {
            $set: {
                linkedin: linkedin,
                youtube: youtube,
                github: github
            }
        },
        { new: true }
    ).select("-password -refreshToken");

    return res
        .status(200)
        .json(new ApiResponse(200, users, "Socialmedia was added"));
})

//+ editcreatorname + bio +soicalmedia
const editcreatorprofile = asyncHandler(async (req, res) => {
    const { linkedin, youtube, github, bio, creatorname, title, personalWebsite } = req.body
    console.log(req.body, req.users?._id);

    const users = await Creator.findByIdAndUpdate(
        req.users?._id,
        {
            $set: {
                linkedin: linkedin,
                youtube: youtube,
                github: github,
                bio: bio,
                creatorname: creatorname,
                title: title,
                personalwebsite: personalWebsite,

            }
        },
        { new: true }
    ).select("-password -refreshToken");
    console.log(users);

    return res
        .status(200)
        .json(new ApiResponse(200, users, "Profile was Updated"));

})

//verfiyauth
const verifyauth = asyncHandler(async (req, res) => {
    return res
        .status(200)
        .json(new ApiResponse(
            200,
            req.users,
            "User fetched Successfully"))

})

//edit createname and bio
const editcreatenameandbio = asyncHandler(async (req, res) => {

    const { creatorname, bio } = req.body

    if (
        [creatorname, bio].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(400, "Creator name, and bio are required")
    }

    if (creatorname.trim().length < 5) {
        throw new ApiError(400, "Creator name must be at least 5 characters long")
    }

    if (bio.length < 25) {
        throw new ApiError(400, "Bio must be more descriptive (at least 25 characters).")
    }

    const users = await Creator.findByIdAndUpdate(
        req.users?._id,
        {
            $set: {
                creatorname: creatorname,
                bio: bio
            }
        }
        ,
        { new: true }
    )
        .select("-password -refreshToken");

    return res
        .status(200)
        .json(new ApiResponse(200, users, "Creator name and bio updated successfully"));
})

export { registercreator, verfiyemail, resendotp, logincreator, logoutcreator, refreshaccesstoken, changecurrentpassword, 
    getcurrentuser, editprofilcreator, addsocialmedia, verifyauth, editcreatenameandbio, editcreatorprofile }