// const nodemailer = require("nodemailer");
import nodemailer from "nodemailer";
import { generateOTP } from "./generateOTP";
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "vasudhapatoliya502@gmail.com",
    pass: "mlta ztcb qmpl bovp",
  },
});

function sendWelcomeEmail({ email, url, subject }) {
  //   const text = "http://127.0.0.1:5173" + url;
  const mailOptions = {
    from: "vasudhapatoliya502@gmail.com",
    to: email,
    subject: subject,
    text: `http://localhost:5173/${url}`,
  };

  return transporter.sendMail(mailOptions);
}

// otp
function sendOTPEmail({ email, url, subject }) {
  //   const text = "http://127.0.0.1:5173" + url;
  const OTP = generateOTP();

  const mailOptions = {
    from: "vasudhapatoliya502@gmail.com",
    to: email,
    subject: "OTP",
    text: `your OTP is: ${OTP}`,
    //   subject: subject,
    //   text: `http://localhost:5173/${url}`,
  };

  return transporter.sendMail(mailOptions);
}
