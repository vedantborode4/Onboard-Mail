import express from "express"
import { sendMail } from "./controllers/sendmail.js"
import cors from "cors"

const app = express()

const allowedOrigin = process.env.CORS_ORIGIN

const corsOptions = {
  origin: allowedOrigin,
  methods: ['GET', 'POST'],  
};
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cors(corsOptions))

app.post("/sendMail", sendMail)

export {app}