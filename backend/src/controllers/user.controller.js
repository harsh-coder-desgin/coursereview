import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import jwt from "jsonwebtoken"
// import { SendEmail } from "../middlewares/auth.middlewares.js"
import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Creator } from "../models/cretor.model.js";
import { Course } from "../models/course.model.js";
import mongoose from "mongoose";
import { CreatorFollow } from "../models/creatorfollow.model.js";

//generate-AccessRefreshTokens
const generateAccessRefreshTokens = async (userId) => {
    try {
        const user = await User.findById(userId)
        // const accessToken=user.generateAccessToken
        // const refreshToken=user.generateRefreshToken
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        user.refreshToken = refreshToken
        await user.save({ validateBeforeSave: false })
        return { accessToken, refreshToken }
    } catch (error) {
        throw new ApiError(500, "something went wrong while refresh and access token")

    }
}

//user-register
const userregister = asyncHandler(async (req, res) => {

    const { username, email, password } = req.body

    if (
        [username, email, password].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(400, "All fields (user name, email, password) are required")
    }

    if (username.trim().length < 5) {
        throw new ApiError(400, "user name must be at least 5 characters long")
    }

    if (password.trim().length < 8) {
        throw new ApiError(400, "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character")
    }

    const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

    if (!strongPasswordRegex.test(password)) {
        throw new ApiError(400, "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character");
    }
    const existeduser = await User.findOne({
        $or: [{ email }]
    })

    if (existeduser) {
        throw new ApiError(400, "A user with this email or user name already exists")
    }
    const verficationCode = Math.floor(1000 + Math.random() * 9000).toString()
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes from now

    const user = await User.create({
        username: username.toLowerCase(),
        email: email.toLowerCase(),
        password,
        verficationCode,
        expiresAt,
    })

    if (!user) {
        throw new ApiError(500, "Failed to create user. Please try again.");
    }

    // SendEmail(user.email, verficationCode).catch(console.error);

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while creating your account. Please try again")
    }

    return res.status(201).json(
        new ApiResponse(200, createdUser, "User registered successfully. Please verify your email to activate your account")
    )

})

//verfiy-email
const userverfiyemail = asyncHandler(async (req, res) => {

    const { code } = req.body

    if (!code || code.trim() === "") {
        throw new ApiError(400, "Verification code is required")
    }

    const users = await User.findOne({
        verficationCode: code
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
    const loginUser = await User.findById(users._id).select("-password -refreshToken")

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

//resend-otp
const userresendotp = asyncHandler(async (req, res) => {

    const { email } = req.body

    if (!email || email.trim() === "") {
        throw new ApiError(400, "Email is required to resend the verification code.");
    }

    const newverficationCode = Math.floor(1000 + Math.random() * 9000).toString()
    const newExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    const users = await User.findOne({
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

    return res.status(201).json(
        new ApiResponse(200, "A new verification code has been sent to your email")
    )
})

//user-login
const userlogin = asyncHandler(async (req, res) => {

    const { email, password } = req.body

    if (
        [email, password].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(400, "Email, user name, and password are required")
    }

    if (password.trim().length < 8) {
        throw new ApiError(400, "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character")
    }

    const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

    if (!strongPasswordRegex.test(password)) {
        throw new ApiError(400, "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character");
    }

    const users = await User.findOne({
        $or: [{ email }]
    })

    if (!users) {
        throw new ApiError(400, "No account matches the provided email and creator name")
    }

    if (users.email !== email) {
        throw new ApiError(400, "The email is incorrect.");
    }
    const checkpasswordiscorrect = await users.isPasswordCorrect(password)

    if (!checkpasswordiscorrect) {
        throw new ApiError(400, "Incorrect password. Please try again")
    }

    const { refreshToken, accessToken } = await generateAccessRefreshTokens(users._id)
    const loginUser = await User.findById(users._id).select("-password -refreshToken")

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

//user-logout
const userlogout = asyncHandler(async (req, res) => {

    const userId = req.users._id

    if (!userId) {
        throw new ApiError(401, "User authentication failed. Please log in again.");
    }

    await User.findByIdAndUpdate(
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

//search-creator
const searchcreator = asyncHandler(async (req, res) => {

    const { name } = req.body

    if (!name || name?.trim() === "") {
        throw new ApiError(400, "Please enter a creator name to search.");
    }

    const searchStrings = name.trim().split(/\s+/); 

    const findcreatorname = await Creator.find({
        $or: searchStrings.map(str => ({
            creatorname: { $regex: str, $options: "i" }
        }))
    });

    if (!findcreatorname || findcreatorname.length === 0) {
        throw new ApiError(400, "No creator results for your search.");
    }

    return res.status(201).json(
        new ApiResponse(200, findcreatorname, "Creator search results fetched successfully")
    )
})

//serach-course
const searchcourse = asyncHandler(async (req, res) => {

    const { course } = req.body

    if (!course || course.trim() === "") {
        throw new ApiError(400, "Please enter a course name to proceed with the search");
    }

    const searchStrings = course.trim().split(/\s+/); 
    const findcoursename = await Course.find({
        $or: searchStrings.map(str => ({
            tags: { $regex: str, $options: "i" }
        }))
    });

    if (!findcoursename || findcoursename.length === 0) {
        throw new ApiError(400, "No matching courses found for the given course name.");
    }
   
    return res.status(201).json(
        new ApiResponse(200, findcoursename, "Course search results fetched successfully")
    )
})

//latest-course
const latestcourse = asyncHandler(async (req, res) => {

    const getcourse = await Course.find()

    return res.status(201).json(
        new ApiResponse(200, getcourse, "New courses fetched successfully")
    )

})

//get-allcreator
const getallcreator = asyncHandler(async (req, res) => {

    const getcreator = await Creator.find({ isVerified: true }).select("profile , creatorname")

    if (!getcreator || getcreator.length === 0) {
        throw new ApiError(404, "No creators found.");
    }

    return res.status(201).json(
        new ApiResponse(200, getcreator, "creators fetched successfully")
    )
})

//paid-course
const paidcourse = asyncHandler(async (req, res) => {

    const getpaidcourse = await Course.find({ coursetype: "paid" })
    const oneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000); 

    if (!getpaidcourse) {
        throw new ApiError(404, "No paid courses available at the moment.");
    }

    for (const course of getpaidcourse) {
        course.newcourse = course.createdAt >= oneWeekAgo; 
        await course.save(); 
    }
    return res.status(201).json(
        new ApiResponse(200, getpaidcourse, "Paid courses fetched successfully.")
    )
})

//free-course
const freecourse = asyncHandler(async (req, res) => {

    const getfreecourse = await Course.find({ coursetype: "free" })
    const oneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000); 

    if (!getfreecourse) {
        throw new ApiError(404, "No free courses available at the moment.");
    }

    for (const course of getfreecourse) {
        course.newcourse = course.createdAt >= oneWeekAgo; 
        await course.save();
    }

    return res.status(201).json(
        new ApiResponse(200, getfreecourse, "Free courses fetched successfully.")
    )
})

//free-course-detail
const freecoursedetail = asyncHandler(async (req, res) => {

    const courseId = req.params.id;
    const courseget = await Course.findById(courseId)

    if (!courseget) {
        throw new ApiError(400, "Course not found. Please check the ID and try again");
    }

    let ans = courseget.tags
    const realtedcourse = await Course.find({
        tags: ans,
        _id: { $ne: new mongoose.Types.ObjectId(courseId) },
        coursetype: "free"
    })

    const oneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000); 

    if (courseget.createdAt < oneWeekAgo) {
        courseget.newcourse = false; 
    } else {
        courseget.newcourse = true; 
    }

    await courseget.save()
    return res
        .status(200)
        .json(new ApiResponse(200, { courseget, realtedcourse }, "Course details fetched successfully"));
})

//paid-course-detail
const paidcoursedetail = asyncHandler(async (req, res) => {

    const courseId = req.params.id;
    const courseget = await Course.findById(courseId)

    if (!courseget) {
        throw new ApiError(400, "Course not found. Please check the ID and try again");
    }

    let ans = courseget.tags
    const realtedcourse = await Course.find({
        tags: ans,
        _id: { $ne: new mongoose.Types.ObjectId(courseId) },
        coursetype: "paid"
    })
    const oneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000); 

    if (courseget.createdAt < oneWeekAgo) {
        courseget.newcourse = false; 
    } else {
        courseget.newcourse = true; 
    }

    await courseget.save()
    return res
        .status(200)
        .json(new ApiResponse(200, { courseget, realtedcourse }, "Course details fetched successfully"));
})

//get-one-creator
const getonecreator = asyncHandler(async (req, res) => {

    const courseId = req.params.id;

    const creatordetail = await Creator.findById(courseId).select("-password -refreshToken")

    if (!creatordetail) {
        throw new ApiError(404, "Creator not found with the given ID.");
    }

    const creatorcourse = await Course.find({ ownerid: courseId })

    if (!creatorcourse) {
        throw new ApiError(404, "This creator has not added any courses yet.");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, { creatordetail, creatorcourse }, "Creator profile and courses fetched successfully."));

})

//top-rated-course
const topratedcourse = asyncHandler(async (req, res) => {
    const topcourse = await Course.find({
        rating: {
            $gte: 4,
            $lte: 5 || null
        }
    });
    if (!topcourse) {
        throw new ApiError(404, "No top-rated courses found.");
    }

    return res.status(201).json(
        new ApiResponse(200, topcourse, "Top-rated courses fetched successfully.")
    )
})

//follow-creator
const followcreator = asyncHandler(async (req, res) => {

    const userID = req.users._id; 
    const creatorid = req.params.id

    const follow = await CreatorFollow.create({
        userid: userID,
        creatorid: creatorid
    })

    if (!follow) {
        throw new ApiError(500, "Failed to follow the creator. Please try again.");
    }

    await Creator.findByIdAndUpdate(
        creatorid, 
        { $inc: { follower: 1 } },
        { new: true }
    )

    return res
        .status(200)
        .json(new ApiResponse(200, follow, "Creator followed successfully"));
})

//unfollow-creator
const unfollowcreator = asyncHandler(async (req, res) => {

    const userID = req.users._id; 
    const creatorid = req.params.id

    const unfollow = await CreatorFollow.findOneAndDelete({
        userid: userID,
        creatorid: creatorid
    })

    await Creator.findByIdAndUpdate(
        creatorid, 
        { $inc: { follower: -1 } }, 
        { new: true }
    )

    return res
        .status(200)
        .json(new ApiResponse(200, unfollow, "Creator unfollowed successfully."));
})

//getuser
const getcurrentuser = asyncHandler(async (req, res) => {
    return res
        .status(200)
        .json(new ApiResponse(
            200,
            req.users,
            "User fetched Successfully"))

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

        const users = await User.findById(decodeedtoken?._id)

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

//serachtopratedcourse
const serachtopratedcourse = asyncHandler(async (req, res) => {

    const { tags } = req.body
    let query = { rating: { $gte: 4, $lte: 5 } }

    if (tags && tags.trim() !== "") {
        query.tags = tags.toLowerCase();
    }

    const findcoursebytags = await Course.find(query);

    if (!findcoursebytags || findcoursebytags.length === 0) {
        throw new ApiError(404, "No matched Tags Course is Found ");
    }
    return res
        .status(200)
        .json(new ApiResponse(200, findcoursebytags, "All courses fetched successfully"));
})

//all find course by tags
const allfindcoursebytags = asyncHandler(async (req, res) => {

    const { activeTab } = req.body
    let query = {}

    if (activeTab === "All") {
        query = {}
    }

    if (activeTab && activeTab.trim() !== "" && activeTab !== "All") {
        query.coursecategory = activeTab
    }

    const findcoursebytags = await Course.find(query);

    return res
        .status(200)
        .json(new ApiResponse(200, findcoursebytags, "All courses fetched successfully"));
})

//search
const serachsuggestion = asyncHandler(async (req, res) => {

    const { name } = req.body
    const searchStrings = name?.trim().split(/\s+/);

    const findcreatorname = await Creator.find({
        $or: searchStrings.map(str => ({
            creatorname: { $regex: str, $options: "i" }
        }))
    })
        .select("creatorname")
        .limit(6);

    return res.status(201).json(
        new ApiResponse(200, findcreatorname, "Creator search results fetched successfully")
    )
})

//serach suggestion
const serachcoursesuggestion = asyncHandler(async (req, res) => {

    const { name } = req.body
    const searchStrings = name.trim().split(/\s+/);

    const findcoursename = await Course.distinct("tags", {
        $or: searchStrings.map(str => ({
            tags: { $regex: str.toLowerCase(), $options: "i" }
        }))
    });

    return res.status(201).json(
        new ApiResponse(200, findcoursename, "Course search results fetched successfully")
    )
})

//coursedetail
const coursedetail = asyncHandler(async (req, res) => {

    const id = req.params.id;
    const course = await Course.findById(id)

    if (!course) {
        throw new ApiError(404, "No matched Course is Found ");
    }

    return res.status(201).json(
        new ApiResponse(200, course, "Course fetched successfully")
    )
})
export {
    coursedetail, userregister, userverfiyemail, userresendotp, userlogin, userlogout, searchcreator, searchcourse, latestcourse,
    getallcreator, paidcourse, freecourse, freecoursedetail, paidcoursedetail, getonecreator, topratedcourse,followcreator, 
    unfollowcreator, getcurrentuser, refreshaccesstoken, serachtopratedcourse, allfindcoursebytags, serachsuggestion, serachcoursesuggestion
}