import { connectDBHandler } from "@/app/lib/dbconnection/db";
import { Cart } from "@/app/lib/models/addToCartModal";
import { sendWelcomeEmail } from "@/app/lib/utils/sendEmail";

const handler = connectDBHandler(async (req, res) => {
  console.log("===here");
  const cartData = await Cart.find({}).populate({
    path: "userId",
    // select: "email",
  });

  // console.log("🚀 ~ handler ~ cartData:", cartData);

  // cartData?.map((data) => {
  //   const email = data?.userId.email;
  //   console.log("🚀 ~ handler ~ email:", email);
  //   const url = `cart`;
  //   const subject = "notification for product";

  //   sendWelcomeEmail({ email, url, subject });
  // });

  res.status(200).json({ message: "Hello from Next.js!" });
});

export default handler;
