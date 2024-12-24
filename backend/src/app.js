import express from "express"
import { sendMail } from "./controllers/sendmail.js"
import cors from "cors"

const app = express()

const allowedOrigin = process.env.CORS_ORIGIN

const corsOptions = {
  origin: [
    'https://onboard-mail.vercel.app',
    'http://localhost:5173' // For local development
  ],
  methods: ['GET', 'POST', 'OPTIONS'],
  credentials: true
};

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cors(corsOptions))

app.post("/sendMail", sendMail)

export {app}