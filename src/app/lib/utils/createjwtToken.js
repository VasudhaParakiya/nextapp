import jwt from "jsonwebtoken";

const createJwtToken = (user) => {
  const accessToken = jwt.sign(
    {
      _id: user._id,
      // firstName: user.firstName,
      // lastName: user.lastName,
      // email: user.email,
      // role: user.role,
    },
    process.env.JWT_SECRET
    // { expiresIn: "10min" }
  );

  // console.log("🚀 ~ loginUser: ~ accessToken:", accessToken);

  return {
    accessToken: accessToken,
  };
};

export default createJwtToken;
