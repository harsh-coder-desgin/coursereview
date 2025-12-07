import { Router}  from "express"
import { followcreator, freecourse, freecoursedetail, getallcreator,coursedetail, 
  getonecreator, latestcourse, paidcourse, paidcoursedetail, searchcourse, searchcreator, topratedcourse, 
  unfollowcreator, userlogin, userlogout, userregister, userresendotp, userverfiyemail,getcurrentuser ,refreshaccesstoken, 
  serachtopratedcourse,allfindcoursebytags,serachsuggestion,serachcoursesuggestion } from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/usertoken.middleware.js";

const router = Router()

// user signup and login
router.route("/register").post(userregister)
router.route("/login").post(userlogin)
router.route("/logout").post(verifyJWT,userlogout)
router.route("/emailverfication").post(userverfiyemail)
router.route("/newotp").post(userresendotp)
router.route("/getuser").get(verifyJWT,getcurrentuser)
router.route("/verifyuserauth").get(verifyJWT)
router.route("/refreshtoken").post(refreshaccesstoken)

//search
router.route("/searchcreatorname").post(searchcreator)
router.route("/searchcoursename").post(searchcourse)
//serach through id
router.route("/course/:id").get(coursedetail)
router.route("/searchsuggestion").post(serachsuggestion)
router.route("/serachcoursesuggestion").post(serachcoursesuggestion)

//course
router.route("/latestcourse").get(latestcourse)
router.route("/showallcreator").get(getallcreator)
router.route("/paidcourse").get(paidcourse)
router.route("/freecourse").get(freecourse)
router.route("/allfindcoursebytags").post(allfindcoursebytags)
router.route("/getcoursefree/:id").get(freecoursedetail)
router.route("/getcoursepaid/:id").get(paidcoursedetail)
router.route("/getcreatorprofile/:id").get(getonecreator)
router.route("/topratedcourse").get(topratedcourse)
router.route("/topratedserachbytag").post(serachtopratedcourse)

//follow creator
router.route("/followcreator/:id").get(verifyJWT,followcreator)
router.route("/unfollowcreator/:id").get(verifyJWT,unfollowcreator)

export default router