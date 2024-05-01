if (process.env.NODE_ENV !== 'production') { require('dotenv').config }
import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_CONTACTO,
    pass: process.env.APP_PASSWORD
  }
})
export function sendEmail(mailOptions) {
  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) reject(error)
      else resolve(true)
    })
  })
}