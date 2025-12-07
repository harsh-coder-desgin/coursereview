import mongoose, { Schema } from "mongoose";

const reviewSchema = new Schema({
    coursename: {
        type: String,
        required: true,
        trim: true,
        index: true
    },
    userreview: {
        type: String,
        required: true,
    },
    coursetype: {
        type: String,
        required: [true, "Course type is required"],
        enum: ["free", "paid"],   
    },
    creatorname: {
        type: String
    },
    courseage: {
        type: Number,
        required: false
    },
    userrating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    username:{
        type:String,
        required:true,
    },
    userid: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    creatorid: {
        type: Schema.Types.ObjectId,
        ref: "Creator"
    },
    courseid: {
        type: Schema.Types.ObjectId,
        ref: "Course"
    },
},
    {
        timestamps: true
    })

export const Review = mongoose.model("Review", reviewSchema)

