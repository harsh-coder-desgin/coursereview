import mongoose, { Schema } from "mongoose";

const courseSchema = new Schema({
    coursetitle: {
        type: String,
        required: [true, "Course title is required"],
        trim: true,
        index: true
    },
    coursesubtitle: {
        type: String,
        required: [true, "Course subtitle is required"],
        trim: true,
        index: true
    },
    coursecategory: {
        type: String,
    },
    coursetopic: {
        type: String,
    },
    courselanguage: {
        type: String,
    },
    courselevel: {
        type: String,
    },
    coursetype: {
        type: String,
        required: [true, "Course type is required"],
        enum: ["Free", "Paid"],
    },
    courseyear: {
        type: Number,
        required: [true, "Course year is required"],
    },
    courselength: {
        type: String,
        required: [true, "Course length is required"],
    },
    rating: {
        type: Number,
    },
    totalreview: {
        type: Number,
    },
    description: {
        type: String,
        required: [true, "Course description is required"],
    },
    whatlearnformcourse: {
        type: [
            {
                title: { type: String, required: true },
                lessons: [{ type: String, required: true }]
            }
        ],
        required: [true, "Learning objectives are required"],
    },
    newcourse: {
        type: Boolean,
        default: true
    },
    ownerid: {
        type: Schema.Types.ObjectId,
        ref: "Creator"
    },
    ownername: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        default: 0
    },
    discount: {
        type: Number,
        default: 0
    },
    finalPrice: {
        type: Number,
        default: 0
    },
    courseimage: { type: String, required: true },
    courseimagePublicId: { type: String, required: true },
},
    {
        timestamps: true
    })


export const Course = mongoose.model("Course", courseSchema)