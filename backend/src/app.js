import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import errorHandler from "./middlewares/error.middleware.js"
const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))
app.use(cookieParser())

import cretorRouter from './routes/creator.router.js'
import courseRouter from './routes/course.route.js'
import userRouter from './routes/user.route.js'
import reviewRouter from './routes/review.route.js'

// http://localhost:8000/api/v1/users/register
app.use("/api/creator",cretorRouter)
app.use("/api/crouses",courseRouter)
app.use("/api/users",userRouter)
app.use("/api/review",reviewRouter)
app.use(errorHandler)

export { app }