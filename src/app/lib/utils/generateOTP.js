import otpGenerator from "otp-generator";

export const generateOTP = () => {
  // const myotp = `${Math.floor(1000 + Math.random() * 9000)}`; // 4 digit otp

  const OTP = otpGenerator.generate(6, {
    upperCaseAlphabets: false,
    lowerCaseAlphabets: false,
    specialChars: false,
  });

  return OTP;
};
