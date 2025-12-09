import { Course } from "../models/course.model.js";
import { Review } from "../models/review.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js"
import { uploadOnCloundinary } from "../utils/cloundinary.js"
import { v2 as cloudinary } from "cloudinary";
import { Creator } from "../models/cretor.model.js";

//add-course
const addcourse = asyncHandler(async (req, res) => {

    const ownercreatorname = req.users.creatorname

    const { title, subtitle, coursecategory, coursetopic, courselanguage, courselevel, courseduration, coursetype, description, whatlearnformcourse,
        price, discount, courseimage } = req.body
    if (
        [
            title, subtitle, coursecategory, coursetopic, courselanguage, courselevel, courseduration, coursetype, description, whatlearnformcourse
        ].some(field => field === "")
    ) {
        throw new ApiError(
            400,
            "Missing required fields. Please provide all necessary course details including: coursetitle, coursesubtitle, coursecategory, coursetopic, courselanguage, courselevel, courseduration, coursetype, description, price, discount."
        );
    }
 
    if (whatlearnformcourse.length === 0 || courseimage.length === 0) {
        throw new ApiError(400, "whatlearnformcourse  and courseimage must be required.");
    }
    if (title.trim().length < 5 && title.trim().length < 5) {
        throw new ApiError(400, "Course title and Course Subtitle must be at least 5 characters long.");
    }

    if (description.length < 25) {
        throw new ApiError(400, "Course description must be at least 25 characters long.");
    }

    let finalPrice = price;

    if (Number(price) > 0 && (Number(discount) > 0)) {

        if (Number(price) >= 10000000) {
            throw new ApiError(400, "Course price must be less than ₹10,000,000");
        }

        if (Number(discount) < 0) {
            throw new ApiError(400, "Discount cannot be negative.");
        }

        if (Number(discount) > 100) {
            throw new ApiError(400, "Discount cannot be more than 100%.");
        }

        if (Number(discount) > 0) {
            const discountValue = (discount * price) / 100;
            finalPrice = price - discountValue;
        }
    }

    const imageUrl = courseimage[0];
    const imagePublicId = courseimage[1];
    const currentYear = new Date().getFullYear();

    const coursesdata = await Course.create({
        coursetitle: title,
        coursesubtitle: subtitle,
        coursetype: coursetype,
        coursecategory: coursecategory,
        coursetopic: coursetopic,
        courselanguage: courselanguage,
        courselevel: courselevel,
        ownername: ownercreatorname,
        courseyear: currentYear,
        courseimage: imageUrl,
        courseimagePublicId: imagePublicId,
        courselength: courseduration,
        description: description.trim().replace(/\s{2,}/g, " "),
        whatlearnformcourse: whatlearnformcourse,
        rating: 0,
        totalreview: 0,
        ownerid: req.users._id,
        price: price || 0,
        discount: discount || 0,
        finalPrice: finalPrice || 0
    })

    await coursesdata.save().catch(() => {
        throw new ApiError(500, "Something went wrong while adding the course. Please try again later.");
    });

    if (!coursesdata) {
        throw new ApiError(500, "Failed to add the course to your account. Please try again")
    }

    return res.status(201).json(
        new ApiResponse(200, coursesdata, "Course has been added successfully.")
    )
})

//upload-course-image
const uploadcourseimage = asyncHandler(async (req, res) => {
    const courseId = req.params.id;
    const courseLocalPath = req.files?.courseimage?.[0];

    if (!courseLocalPath) {
        throw new ApiError(400, "Course image is required")
    }

    const imagecourse = await uploadOnCloundinary(courseLocalPath, "courses")

    if (!imagecourse) {
        throw new ApiError(400, "Failed to upload profile image. Please try again")
    }

    courseLocalPath.buffer = null;

    return res
        .status(200)
        .json(new ApiResponse(200, [imagecourse.url, imagecourse.public_id], "Course image upload successfully"));
})

//edit-course
const editcourse = asyncHandler(async (req, res) => {

    const courseId = req.params.id;
    console.log("Params:", req.params);


    const { title, subtitle, coursecategory, coursetopic, courselanguage, courselevel, courseduration } = req.body
    console.log(req.body,courseId);
    
    // const discount = (coursetype === "free" && Number(price) > 0) ? 100 : req.body.discount;
    // const discountPrice = (coursetype === "free") ? 0 : req.body.discountPrice;

    if (
        [title, subtitle, coursecategory, coursetopic, courselanguage, courselevel, courseduration
            ].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(400, "Missing required fields. Please provide all necessary course details including: title, subtitle, coursecategory, coursetopic, courselanguage, courselevel, courseduration,")
    }

    if (title.trim().length < 5) {
        throw new ApiError(400, "Course title must be at least 5 characters long.");
    }

    if (subtitle.trim().length < 5) {
        throw new ApiError(400, "Course subtitle must be at least 5 characters long.");
    }

    if (coursetopic.trim().length < 5) {
        throw new ApiError(400, "Course coursetopic must be at least 5 characters long.");
    }

    // let cleanedWhatLearn = "";
    // if (whatlearnformcourse) {
    //     let cleaned = whatlearnformcourse.trim();
    //     cleaned = cleaned.replace(/ {2,}/g, " ");
    //     cleaned = cleaned.replace(/^\s*$/gm, "");
    //     cleaned = cleaned.replace(/\n{2,}/g, "\n");
    //     cleanedWhatLearn = cleaned.trim();
    // }

    // let finalPrice = price;

    // if (coursetype === "paid") {
    //     if (Number(price) <= 0) {
    //         throw new ApiError(400, "Course price must more than 0");
    //     }
    // }

    // if (Number(price) >= 10000000) {
    //     throw new ApiError(400, "Course price must be less than ₹10,000,000");
    // }

    // if (Number(discount) < 0 || Number(discountPrice) < 0) {
    //     throw new ApiError(400, "Discount cannot be negative.");
    // }

    // if (Number(discount) > 100) {
    //     throw new ApiError(400, "Discount cannot be more than 100%.");
    // }

    // if (Number(discountPrice) > Number(price)) {
    //     console.log(discountPrice, price);

    //     throw new ApiError(400, "Discount amount cannot be greater than the course price.");
    // }

    // if (Number(price) > 0 && (Number(discount) > 0 || Number(discountPrice) > 0)) {
    //     if (Number(discount) > 0) {
    //         const discountValue = (discount * price) / 100;
    //         finalPrice = price - discountValue;
    //     }
    //     else if (Number(discountPrice) > 0) {
    //         finalPrice = price - discountPrice;
    //     }
    // }

    const updatedCourse = await Course.findByIdAndUpdate(
        courseId,
        {
            $set: {
                coursetitle:title,
                courselength:courseduration,
                coursesubtitle:subtitle,
                coursecategory:coursecategory,
                coursetopic:coursetopic,
                courselanguage:courselanguage,
                courselevel:courselevel,
                // description: description.trim().replace(/\s{2,}/g, " "),
                // whatlearnformcourse: cleanedWhatLearn,
            }
        }
        ,
        { new: true }
    )

    await updatedCourse.save().catch(() => {
        throw new ApiError(500, "An unexpected error occurred while updating the course. Please try again later.");
    });

    if (!updatedCourse) {
        throw new ApiError(404, "Course not found. Please check the course ID and try again.");
    }

    return res.status(201).json(
        new ApiResponse(200, updatedCourse, "Course updated successfully")
    )
})

//edit-course-image
const editcourseimgae = asyncHandler(async (req, res) => {

    const courseId = req.params.id;
    const {whatlearnformcourse} =req.body
    const courseLocalPath = req.files?.courseimage?.[0];

    if (!courseLocalPath) {
        throw new ApiError(400, "Course image is required. Please upload a valid image file");
    }

    if (!whatlearnformcourse) {
        throw new ApiError(400, "whatlearnformcourse is required");
    }

    const currentUser = await Course.findById(courseId);

    if (currentUser?.courseimagePublicId) {
        await cloudinary.uploader.destroy(currentUser.courseimagePublicId);
    }

    const imagecourse = await uploadOnCloundinary(courseLocalPath, "courses");

    if (!imagecourse.url) {
        throw new ApiError(400, "Failed to upload the course image. Please try again later");
    }

    const courseimageupdate = await Course.findByIdAndUpdate(
        courseId,
        {
            $set: {
                courseimage: imagecourse.url,
                courseimagePublicId: imagecourse.public_id,
                whatlearnformcourse:whatlearnformcourse,
            }
        },
        { new: true }
    )

    if (!courseimageupdate) {
        throw new ApiError(404, "Course image update failed or course not found.");
    }
    return res
        .status(200)
        .json(new ApiResponse(200, courseimageupdate, "Course image updated successfully"));
})

//update price and coursetype
const updatepricecourse = asyncHandler(async(req,res)=>{

    const courseId = req.params.id;

    const { price, discount, coursetype } = req.body

    if (
         [price, discount, coursetype].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(400, "Missing required fields. Please provide all necessary course details including: price, discount, coursetype")
    }

     let finalPrice = price;

    if (Number(price) > 0 && (Number(discount) > 0)) {

        if (Number(price) >= 10000000) {
            throw new ApiError(400, "Course price must be less than ₹10,000,000");
        }

        if (Number(discount) < 0) {
            throw new ApiError(400, "Discount cannot be negative.");
        }

        if (Number(discount) > 100) {
            throw new ApiError(400, "Discount cannot be more than 100%.");
        }

        if (Number(discount) > 0) {
            const discountValue = (discount * price) / 100;
            finalPrice = price - discountValue;
        }
    }

    
    const updatedCourse = await Course.findByIdAndUpdate(
        courseId,
        {
            $set: {
                price:price,
                discount:discount,
                finalPrice:finalPrice,
            }
        }
        ,
        { new: true }
    )

    if (!updatedCourse) {
        throw new ApiError(404, "Course not found. Please check the course ID and try again.");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, updatedCourse, "Course updated successfully"));
})

//get-all-course
const getallcourse = asyncHandler(async (req, res) => {

    const ownerid = req.users._id.toString()

    const getallcourse = await Course.find({ ownerid: ownerid })

    if (!getallcourse) {
        throw new ApiError(400, "Unable to fetch courses at the moment. Please try again later");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, getallcourse, "All courses fetched successfully"));
})

//show-course
const showcourse = asyncHandler(async (req, res) => {

    const courseId = req.params.id;
    const courseget = await Course.findById(courseId)

    const countratingandreview = await Review.find({
        courseid: courseId
    })

    if (!countratingandreview) {
        throw new ApiError(404, "No reviews found for the selected course.");
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
        throw new ApiError(400, "Course not found. Please check the ID and try again");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, courseget, "Course details fetched successfully"));
})

//course-overview-dashboard
const courseoverviewdashboard = asyncHandler(async (req, res) => {

    const ownerid = req.users._id.toString()

    const creatorcourse = await Course.find({ ownerid: ownerid })
    const totalcourse = creatorcourse.length

    if (!creatorcourse) {
        throw new ApiError(400, "Creator not found. Please try again");
    }

    let totalreview = 0;

    creatorcourse.forEach(course => {
        totalreview += course.totalreview || 0;
    });

    const follower = await Creator.findById({ _id: ownerid })

    let totalfollower = follower.follower

    if (totalfollower >= 10000000) {
        let crore = (totalfollower / 10000000).toFixed(1); 
        totalfollower = crore.replace(/\.0$/, '') + " Cr"; 
    } else if (totalfollower >= 100000) { 
        let lakh = (totalfollower / 100000).toFixed(1);
        totalfollower = lakh.replace(/\.0$/, '') + " Lakh";
    } else {
        totalfollower = totalfollower.toString(); 
    }
    if (totalreview >= 10000000) {
        let crore = (totalreview / 10000000).toFixed(1); 
        totalreview = crore.replace(/\.0$/, '') + " Cr"; 
    } else if (totalreview >= 100000) { 
        let lakh = (totalreview / 100000).toFixed(1);
        totalreview = lakh.replace(/\.0$/, '') + " Lakh";
    } else {
        totalreview = totalreview.toString();
    }

    return res
        .status(200)
        .json(new ApiResponse(200, { totalcourse, totalreview, totalfollower }, "Dashboard fetched successfully"));
})

//delete-course
const deletecourse = asyncHandler(async (req, res) => {

    const courseId = req.params.id;
    const deletedata = await Course.findByIdAndDelete(courseId)

    if (!deletedata) {
        throw new ApiError(400, "Failed to delete the course. Please try again");
    }
    return res
        .status(200)
        .json(new ApiResponse(200, "Course deleted successfully"));
})

//latest reviews shows in creator
const latestreview = asyncHandler(async (req, res) => {

    const { timereview } = req.body

    let Ago;
    let Ago2;

    if (timereview === "Today") {
        Ago = new Date(Date.now() - 24 * 60 * 60 * 1000);
        Ago2 = new Date(Date.now() - 1 * 60 * 1000);
    }
    if (timereview === "Week") {
        Ago = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
        Ago2 = new Date(Date.now() - 1 * 24 * 60 * 60 * 1000);
    }
    if (timereview === "Month") {
        Ago2 = new Date(Date.now() - 8 * 24 * 60 * 60 * 1000);
        Ago = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    }

    const newreview = await Review.find({
        createdAt: { $gte: Ago, $lt: Ago2 }
    });

    return res
        .status(200)
        .json(new ApiResponse(200, newreview, "latest Review fetched successfully"));

})

//avreage rating percentage
const avreageratingdata = asyncHandler(async (req, res) => {

    const { rating } = req.body
    const ownerid = req.users._id

    let Ago;
    let Ago2;
    let ratingcourse;
    let reviewcourse;
    let totalaverageRating;
    let loopnum;
    if (rating === "Year") {
        loopnum = 12
        ratingcourse = Array(12).fill(0);
        reviewcourse = Array(12).fill(0);
        totalaverageRating = Array(12).fill(0);
        Ago = new Date(Date.now() - 365 * 24 * 60 * 60 * 1000);
        Ago2 = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000); 
    }

    if (rating === "Week") {
        loopnum = 7
        ratingcourse = Array(7).fill(0);
        reviewcourse = Array(7).fill(0);
        totalaverageRating = Array(7).fill(0);
        Ago = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
        Ago2 = new Date(Date.now() - 1 * 24 * 60 * 60 * 1000);
    }

    if (rating === "Month") {
        loopnum = 30
        ratingcourse = Array(30).fill(0);
        reviewcourse = Array(30).fill(0);
        totalaverageRating = Array(30).fill(0);
        Ago2 = new Date(Date.now() - 8 * 24 * 60 * 60 * 1000);
        Ago = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    }

    let monthchart = new Date(Date.now() - 60 * 24 * 60 * 60 * 1000);

    const creatorcourse = await Course.find({
        ownerid: ownerid,
        createdAt: { $gte: Ago, $lt: Ago2 }
    });

    creatorcourse.forEach(course => {
        const createdAt = new Date(course.createdAt);
        const month = createdAt.getMonth(); 
        ratingcourse[month] += course.rating; 
        reviewcourse[month] += course.totalreview;
    })

    for (let i = 0; i <= loopnum; i++) {
        totalaverageRating[i] = reviewcourse[i] > 0 ? (ratingcourse[i] / reviewcourse[i]).toFixed(1) : 0;
    }

    const latestcourse = await Course.find({
        ownerid: ownerid,
        createdAt: { $gte: monthchart }
    }).select("-coursetype -courseyear -courselength -totalreview -description -yturl -whatlearnformcourse -tags -newcourse -courseimage -courseimagePublicId -ownerid -ownername -price -discount -discountPrice -finalPrice")

    let onestar = 0
    let twostar = 0
    let threestar = 0
    let fourstar = 0
    let fivestar = 0
    let totalrating = 0;
    let totalreview = 0;
    const allrating = []

    creatorcourse.forEach(course => {
        totalrating += course.rating || 0;
        allrating.push(course.rating)
        totalreview += course.totalreview || 0;

        if (course.rating <= 1.5 && course.rating != 0) {
            onestar += 1
        }
        if (course.rating < 2.5 && course.rating > 1.5) {
            twostar += 1
        }
        if (course.rating < 3.5 && course.rating > 2.5) {
            threestar += 1
        }
        if (course.rating < 4.5 && course.rating > 3.5) {
            fourstar += 1
        }
        if (course.rating === 5) {
            fivestar += 1
        }

    });

    const onestarpercentage = Math.floor(onestar * (100 % totalrating))
    const twostarpercentage = Math.floor(twostar * (100 % totalrating))
    const threestarpercentage = Math.floor(threestar * (100 % totalrating))
    const fourstarpercentage = Math.floor(fourstar * (100 % totalrating))
    const fivestarpercentage = Math.floor(fivestar * (100 % totalrating))
    const averageRating = totalreview > 0 ? (totalrating / totalreview).toFixed(1) : 0;
    const findreview = await Review.find({ creatorid: ownerid });
    const monthlyreview = Array(12).fill(0);

    findreview.forEach(course => {
        const createdAt = new Date(course.createdAt);
        const month = createdAt.getMonth(); 
        monthlyreview[month]++; 
    });

    return res
        .status(200)
        .json(new ApiResponse(200, { averageRating, onestarpercentage, twostarpercentage, threestarpercentage, fourstarpercentage, fivestarpercentage, allrating, monthlyreview, latestcourse }, "Rating fetched successfully"));
})

//get-course-by-review
const getonecoursereview = asyncHandler(async (req, res) => {

    const courseId = req.params.id;
    const getcourse = await Review.find({
        courseid: courseId
    })

    return res
        .status(200)
        .json(new ApiResponse(200, getcourse, "Course fetched successfully"));
})

//search tags by explore
const coursebytags = asyncHandler(async (req, res) => {

    const { tags } = req.body
    
    const ownerid = req.users._id.toString()

    let query = { ownerid: ownerid };

    if (tags && tags.trim() !== "" && tags !== "All Categories") {
        query.coursecategory = tags
    }

    const findcoursebytags = await Course.find(query);

    if (!findcoursebytags) {
        throw new ApiError(404, "No matched Tags Course is Found ");
    }
    return res
        .status(200)
        .json(new ApiResponse(200, findcoursebytags, "All courses fetched successfully"));
})

// one course rating and monlty review
const onecourserating =asyncHandler(async(req,res)=>{
    
    const { rating ,id} = req.body
    console.log(req.body);
    
    const ownerid = req.users._id

    let Ago;
    let Ago2;
    if (rating === "Year") {
        Ago = new Date(Date.now() - 365 * 24 * 60 * 60 * 1000);
        Ago2 = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000); 
    }

    if (rating === "Week") {
        Ago = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
        Ago2 = new Date(Date.now() - 1 * 24 * 60 * 60 * 1000);
    }

    if (rating === "Month") {
        Ago2 = new Date(Date.now() - 8 * 24 * 60 * 60 * 1000);
        Ago = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    }

    let monthchart = new Date(Date.now() - 60 * 24 * 60 * 60 * 1000);

    const creatorcourse = await Course.find({
        // ownerid: ownerid,
        _id:id,
    });
    const courserating = creatorcourse.rating || null
    console.log(courserating);

    // const latestcourse = await Course.find({
    //     _id:id,
    //     createdAt: { $gte: monthchart }
    // }).select("-coursetype -courseyear -courselength -totalreview -description -yturl -whatlearnformcourse -tags -newcourse -courseimage -courseimagePublicId -ownerid -ownername -price -discount -discountPrice -finalPrice")
    
        
    const findreviewbytags = await Review.find({
        _id: id,
        createdAt: { $gte: Ago, $lt: Ago2 }
    });

    const findreview = await Review.find({ _id: id });
    let onestar = 0
    let twostar = 0
    let threestar = 0
    let fourstar = 0
    let fivestar = 0
    const allrating = []

    if (findreview.length !== 0) {
        findreview.forEach(course => {
            allrating.push(course.userrating)
    
            if (course.userrating <= 1.5 && course.userrating != 0) {
                onestar += 1
            }
            if (course.userrating < 2.5 && course.userrating > 1.5) {
                twostar += 1
            }
            if (course.userrating < 3.5 && course.userrating > 2.5) {
                threestar += 1
            }
            if (course.userrating < 4.5 && course.userrating > 3.5) {
                fourstar += 1
            }
            if (course.userrating === 5) {
                fivestar += 1
            }
    
        });
    }

    const onestarpercentage = Math.floor(onestar * (100 % courserating))
    const twostarpercentage = Math.floor(twostar * (100 % courserating))
    const threestarpercentage = Math.floor(threestar * (100 % courserating))
    const fourstarpercentage = Math.floor(fourstar * (100 % courserating))
    const fivestarpercentage = Math.floor(fivestar * (100 % courserating))
    const monthlyreview = Array(12).fill(0);

    if (findreview.length !== 0) {
        findreview.forEach(course => {
            const createdAt = new Date(course.createdAt);
            const month = createdAt.getMonth(); 
            monthlyreview[month]++; 
        });        
    }

    return res
        .status(200)
        .json(new ApiResponse(200, { findreviewbytags,courserating, onestarpercentage, twostarpercentage,allrating, threestarpercentage, fourstarpercentage, fivestarpercentage,monthlyreview }, "Rating fetched successfully"));
})

//serachcoursebycreator
const serachcoursebycreator = asyncHandler(async (req, res) => {
   
    const  {course,category}  = req.body    
    const ownerid = req.users._id.toString()

    const searchStrings = course.trim().split(/\s+/); 
    
    let query={ ownerid:ownerid ,$or: searchStrings.map(str => ({
            coursetitle: { $regex: str, $options: "i" }
        }))}

    if (category && category.trim() !== "" && category !== "All Categories") {
        query.coursecategory = category
    }    

    const findcoursename = await Course.find(query);
   
    return res.status(201).json(
        new ApiResponse(200, findcoursename, "Course search results fetched successfully")
    )
})



export {
    addcourse, editcourse, editcourseimgae, getallcourse, showcourse, courseoverviewdashboard, uploadcourseimage,
    deletecourse, latestreview, getonecoursereview, coursebytags, avreageratingdata,onecourserating,serachcoursebycreator,
    updatepricecourse
}