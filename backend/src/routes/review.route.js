import { Router } from "express"
import { verifyJWT } from "../middlewares/usertoken.middleware.js";
import { alluserratingofcreatorreview, alluserratingofreview, getcreatorreview,
  latestreview, showcurrentcoursereview, userwritereview } from "../controllers/review.controller.js";

const router = Router()

//user write review
router.route("/userwritereview").post(verifyJWT, userwritereview)

//course-review print
router.route("/getcoursereview/:id").get(showcurrentcoursereview)
router.route("/getuserrating/:id").post(alluserratingofreview)

//creator-review print
router.route("/getcreatorreview/:id").get(getcreatorreview)
router.route("/getratingcreator/:id").post(alluserratingofcreatorreview)

//latest review
router.route("/getlatestrreview").get(latestreview)

export default router