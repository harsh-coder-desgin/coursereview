import { Router } from "express"
import { addsocialmedia, changecurrentpassword, editcreatenameandbio, editprofilcreator, 
  getcurrentuser, logincreator, logoutcreator, refreshaccesstoken, registercreator, resendotp,
  verfiyemail,verifyauth,editcreatorprofile } from "../controllers/creator.controller.js"
import { upload } from "../middlewares/multer.middlewares.js"
import { verifyJWT } from "../middlewares/tokenverfiy.middleware.js"

const router = Router()

//singup and login
router.route("/register").post(upload.fields([{ name: 'profile', maxCount: 1 }]),registercreator)
router.route("/emailverfication").post(verfiyemail)
router.route("/newotp").post(resendotp)
router.route("/login").post(logincreator)
router.route("/logout").post(verifyJWT,logoutcreator)
router.route("/refreshtoken").post(refreshaccesstoken)
router.route("/verifyauth").get(verifyJWT,verifyauth)

//Profile of creator
router.route("/changepassword").post(verifyJWT,changecurrentpassword)
router.route("/getuser").get(verifyJWT,getcurrentuser)
router.route("/editprofile").patch(verifyJWT,upload.fields([{ name: 'profile', maxCount: 1 }]),editprofilcreator)
router.route("/addsoicalmedia").post(verifyJWT,addsocialmedia)
router.route("/editcreatorprofile").patch(verifyJWT,editcreatorprofile)
router.route("/editcreatornamebio").patch(verifyJWT,editcreatenameandbio)

export default router 