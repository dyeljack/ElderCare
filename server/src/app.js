import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser";

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN
}))

app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))
app.use(cookieParser())

// routes import 

import userRouter from './routes/user.routes.js'
import elderlyRouter from './routes/elderly.routes.js'
import caretakerRouter from './routes/caretaker.routes.js'
import reminderRouter from './routes/reminder.routes.js'

// routes declaration
app.use("/api/v1/users", userRouter)
app.use("/api/v1/elderly", elderlyRouter)
app.use("/api/v1/caretaker", caretakerRouter)
app.use("./api/v1/reminder/create", reminderRouter)

export { app }
