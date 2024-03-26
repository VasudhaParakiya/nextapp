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

export function sendWelcomeEmail({ email, url, subject }) {
  //   const text = "http://127.0.0.1:5173" + url;
  const mailOptions = {
    from: "vasudhapatoliya502@gmail.com",
    to: email,
    subject: subject,
    text: `http://localhost:3000/${url}`,
  };

  return transporter.sendMail(mailOptions);
}

// otp
export function sendOTPEmail({ email, subject, OTP }) {
  //   const text = "http://127.0.0.1:5173" + url;

  // const OTP = generateOTP();

  // 4 digit otp

  const mailOptions = {
    from: "vasudhapatoliya502@gmail.com",
    to: email,
    subject: subject,
    text: `<p>your OTP is: <b> ${OTP} </b></p>`,
    //   subject: subject,
    //   text: `http://localhost:5173/${url}`,
  };

  return transporter.sendMail(mailOptions);

  // transporter.sendMail(mailOptions, (err, info) => {
  //   if (err) {
  //     console.log("🚀 ~ returntransporter.sendMail ~ err:", err);
  //     return err;
  //   } else {
  //     console.log("🚀 ~ returntransporter.sendMail ~ info:", info.response);
  //     return info;
  //   }
  // });
}

export function sendPaymentDetails({ email, subject, text }) {
  //   const text = "http://127.0.0.1:5173" + url;

  // const OTP = generateOTP();

  // 4 digit otp

  const mailOptions = {
    from: "vasudhapatoliya502@gmail.com",
    to: email,
    subject: subject,
    text: text,
  };

  return transporter.sendMail(mailOptions);
}
