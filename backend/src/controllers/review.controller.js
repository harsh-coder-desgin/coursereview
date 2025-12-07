import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { asyncHandler } from "../utils/asyncHandler.js";
import { Review } from "../models/review.model.js";
import { Course } from "../models/course.model.js";

//user-review-creator-course
const userwritereview = asyncHandler(async (req, res) => {

    const { userreview, userrating, coursename, coursetype, creatorname, courseage, creatorid, courseid } = req.body
    const userID = req.users._id; 
    const userName = req.users.username

    if (
        [userreview, userrating].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(400, "User review and rating are required")
    }

    if (Number(userrating) === 0) {
        throw new ApiError(400, "Rating must be greater than zero")
    }

    const createreview = await Review.create({
        coursename: coursename,
        userreview,
        coursetype: coursetype,
        creatorname,
        courseage,
        userrating: userrating,
        userid: userID,
        username: userName,
        creatorid: creatorid || null,
        courseid: courseid
    })

    const courseget = await Course.findById(courseid)

    const countratingandreview = await Review.find({
        courseid: courseid
    })

    if (!countratingandreview) {
        throw new ApiError(500, "No reviews found for the selected course.");
    }

    const totalreview = countratingandreview.length
    let totalrating = 0;

    countratingandreview.forEach(course => {
        totalrating += course.userrating || 0;
    });

    const averageRating = totalreview > 0 ? (totalrating / totalreview).toFixed(1) : 0;
    courseget.totalreview = totalreview
    courseget.rating = averageRating

    await courseget.save()

    if (!courseget) {
        throw new ApiError(500, "Course not found. Please check the ID and try again");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, createreview, "Review submitted successfully"));
})

//showing-review-of-course-page
const showcurrentcoursereview = asyncHandler(async (req, res) => {

    const courseid = req.params.id;

    if (!courseid) {
        throw new ApiError(400, "Course ID is required to fetch course reviews.");
    }
    const getcurrentcoursereview = await Review.find({ courseid: courseid })

    if (!getcurrentcoursereview) {
        throw new ApiError(404, "No reviews found for the specified course.");
    }

    return res.status(200).json(
        new ApiResponse(200, getcurrentcoursereview, "Course reviews fetched successfully")
    );
})

//all-user-rating-review-of -one-course
const alluserratingofreview = asyncHandler(async (req, res) => {

    const courseid = req.params.id;

    const { writerateing } = req.body

    if (!writerateing) {
        throw new ApiError(400, "user rating are required.");
    }

    const checkallreview = await Review.find({
        courseid: courseid, userrating: writerateing
    })

    if (!checkallreview) {
        throw new ApiError(404, "No reviews found with the given rating.");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, checkallreview, "Reviews with the specified rating fetched successfully"));
})

//showing-review-of-creator-page
const getcreatorreview = asyncHandler(async (req, res) => {

    const creatorid = req.params.id;

    if (!creatorid) {
        throw new ApiError(400, "Creator ID is required.");
    }

    const getcurrentcreatorreview = await Review.find({ creatorid: creatorid })

    if (!getcurrentcreatorreview) {
        throw new ApiError(404, "No reviews found for this creator.");
    }

    return res.status(200).json(
        new ApiResponse(200, getcurrentcreatorreview, "Creator reviews fetched successfully")
    );
})

//all-user-rating-of-creator-review
const alluserratingofcreatorreview = asyncHandler(async (req, res) => {

    const creatorid = req.params.id;
    const { writerateing } = req.body

    if (!writerateing) {
        throw new ApiError(400, "user rating are required.");
    }

    const checkallreview = await Review.find({
        creatorid: creatorid, userrating: writerateing
    })

    if (!checkallreview) {
        throw new ApiError(404, "No reviews found with the given rating.");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, checkallreview, "Reviews with the specified rating fetched successfully"));
})

//latest-review-home-page
const latestreview = asyncHandler(async (req, res) => {
    const topreview = await Review.find({
        userrating: { $in: ["3", "4", "5"] }
    }).sort({ createdAt: -1 }); 

    return res
        .status(200)
        .json(new ApiResponse(200, topreview, "Top reviews fetched successfully"));
})

export {
    userwritereview,showcurrentcoursereview,alluserratingofreview, getcreatorreview, alluserratingofcreatorreview,latestreview
}