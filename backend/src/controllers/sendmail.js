import sgMail from "@sendgrid/mail"
import { User } from "../models/user.models.js";


sgMail.setApiKey(process.env.SENDGRID_API_KEY.trim())



const sendMail = async (req, res) => {

    const {firstName, lastName, email} = req.body;

    if (!firstName || !lastName || !email) {
        return res.status(400).send('Missing required fields: firstName, lastName, or email.');
    }

    const user = new User({firstName, lastName, email})

    try {
        await user.save();

        const msg = {
            to: `${email}`,
            from: 'borodevedant4@gmail.com', 
            subject: `Email Verification Successful`,
            text: `Hi ${firstName},\n\nYou have successfully verified your email address!! We're glad to have you on board.`,
            html: `
                <!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Email Verification</title>
                    <style>
                        body {
                            font-family: Arial, sans-serif;
                            margin: 0;
                            padding: 0;
                            background-color: #f4f7fa;
                        }

                        .email-container {
                            width: 100%;
                            max-width: 600px;
                            margin: 0 auto;
                            background-color: #ffffff;
                            padding: 20px;
                            border-radius: 8px;
                            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                        }

                        h1 {
                            color: #333;
                            font-size: 24px;
                            margin-bottom: 10px;
                        }

                        p {
                            color: #555;
                            font-size: 16px;
                            line-height: 1.5;
                        }

                        .highlight {
                            font-weight: bold;
                            color: #4caf50;
                        }

                        .footer {
                            text-align: left;
                            margin-top: 20px;
                            font-size: 12px;
                            color: #aaa;
                        }

                    </style>
                </head>
                <body>
                    <div class="email-container">
                        <h1>Email Verification Success</h1>
                        <p>Hello <span class="highlight">${firstName}</span> <span class="highlight">${lastName}</span>,</p>
                        <p>You have successfully verified your email ${email}</p>
                        <p>Thank you for confirming your email. We're glad to have you on board!</p>
                        <div class="footer">
                            <p>Best regards,<br>Vedant</p>
                        </div>
                    </div>
                </body>
                </html>`,
        }


        await sgMail.send(msg)
        res.send('Welcome email sent successfully!')

    } catch (error) {
        console.log('Error saving user or sending email:', error)
        res.status(500).send('Error processing your request')
    }
}

export {sendMail}