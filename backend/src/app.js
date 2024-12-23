import express from "express"
import { sendMail } from "./controllers/sendmail.js"


const app = express()

app.use(express.urlencoded({extended: true}))

app.post("/sendMail", sendMail)

export {app}