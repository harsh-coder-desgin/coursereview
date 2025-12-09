import { Router } from "express"
import { upload } from "../middlewares/multer.middlewares.js"
import { verifyJWT } from "../middlewares/tokenverfiy.middleware.js"
import { addcourse, coursebytags, courseoverviewdashboard, deletecourse, editcourse, editcourseimgae, getallcourse,
getonecoursereview, showcourse,avreageratingdata,uploadcourseimage,onecourserating,serachcoursebycreator,
updatepricecourse } from "../controllers/course.controller.js";

const router = Router()

//add,update,delete course
router.route("/addcourse").post(verifyJWT,addcourse)
router.route("/addcourseimage").post(verifyJWT,upload.fields([{ name: 'courseimage', maxCount: 1 }]),uploadcourseimage)
router.route("/updatecourse/:id").patch(verifyJWT,editcourse)
router.route("/updatecourseimage/:id").patch(verifyJWT,upload.fields([{ name: 'courseimage', maxCount: 1 }]),editcourseimgae)
router.route("/updateprice/:id").get(verifyJWT,updatepricecourse)
router.route("/deletecourse/:id").get(verifyJWT,deletecourse)


//all course,dashboard,course one get ,getcourse -- get review 
router.route("/allcourses").get(verifyJWT,getallcourse)
router.route("/getcourse/:id").get(verifyJWT,showcourse)
router.route("/dashboardcreator").get(verifyJWT,courseoverviewdashboard)
router.route("/getcoursereview/:id").get(verifyJWT,getonecoursereview)

//explore course tags and latest review 
router.route("/coursebytags").post(verifyJWT,coursebytags)

// calculate averagerating
router.route("/avreageratingdata").post(verifyJWT,avreageratingdata)

//calculate one course rating
router.route("/onecourserating").post(verifyJWT,onecourserating)

//serachcourse coursetags
router.route("/searchonecreatorcoruse").post(verifyJWT,serachcoursebycreator)




export default router