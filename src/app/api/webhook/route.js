import { connectDBHandler } from "@/app/lib/dbconnection/db";
import { Cart } from "@/app/lib/models/addToCartModal";
import { Order } from "@/app/lib/models/orderModal";
import { sendOTPEmail, sendPaymentDetails } from "@/app/lib/utils/sendEmail";
import { stripe } from "@/app/lib/utils/stripe";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

let endpointsecret = "whsec_08j6uEaH0JZ0QR1T8Ku3uF6fIM9mRdTP";

const handler = async (req, res) => {
  //   console.log(
  //     "===================================================================>"
  //   );
  if (req.method == "POST") {
    const body = await req.text();
    const sig = headers().get("stripe-signature");
    //   const sig = request.headers["stripe-signature"];
    console.log("🚀 ~ handler ~ sig:", sig);
    // let session;
    let event;

    try {
      event = stripe.webhooks.constructEvent(body, sig, endpointsecret);
    } catch (err) {
      return NextResponse.json(
        { message: `Webhook Error: ${err.message}` },
        { status: 400 }
      );
      //   res.status(400).send(`Webhook Error: ${err.message}`);
    }

    switch (event.type) {
      case "checkout.session.completed":
        const session = event.data.object;
        console.log("🚀 ~ handler ~ session:", session);

        const cart = await JSON.parse(session?.metadata?.cart);
        // console.log("🚀 ~ handler ~ cart:", cart);
        console.log("data.headers = ", JSON.stringify(cart, undefined, 2));

        const totalPrice = session?.amount_subtotal / 100;

        const email = session?.customer_details?.email;
        const subject = "thanks for the payment for the product";
        const text = `your payment successfull and totalPrice ${totalPrice}`;

        sendPaymentDetails({ email, subject, text });

        const order_customer_details = {
          user_details: {
            userId: cart?.userId,
            product: cart?.product,
          },
          customer_details: {
            email: session?.customer_details?.email,
            fullName: session?.customer_details?.name,
            address: session?.customer_details?.address,
          },
          paymentDetails: {
            payment_status: session?.payment_status,
            payment_method_types: session?.payment_method_types,
            amount_total: session?.amount_total,
            currency: session?.currency,
          },
        };

        const addOrder = connectDBHandler(async (req, res) => {
          try {
            const newOrder = await Order.create(order_customer_details);
            const userId = order_customer_details.user_details.userId;
            // console.log(
            //   "🚀 ~ addOrder ~========================> userId:",
            //   userId
            // );

            if (newOrder) {
              await Cart.deleteOne({ userId });
            }

            if (!newOrder) throw new Error("order not created");
          } catch (error) {
            console.log("🚀 ~ connectDBHandler ~ error:", error);
          }
        });
        addOrder();

        // Then define and call a function to handle the event checkout.session.completed
        break;
      // ... handle other event types
      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    // Handle the event
    // switch (event.type) {
    //   case "checkout.session.completed":
    //     session = event?.data?.object;
    //     console.log("🚀 ~ handler ~ session:", session);
    //     // Then define and call a function to handle the event checkout.session.async_payment_failed
    //     break;
    //     //   case "checkout.session.async_payment_succeeded":
    //     //     session = event.data.object;
    //     //     console.log(
    //     //       "🚀 ~ //app.post=================>>>>>>>>>>>>>>>>>>> ~ session:",
    //     //       session
    //     //     );

    //     //send invoice email using node mailer

    //     // const email=session.customer_details.email;
    //     // const subject="thanks for the payment for the product";
    //     // const text=`hello ${session.customer_details.email} thank for the payment for the product ,here is the link for the product from google drive "product url" .you can downloadby going to the link.`

    //     // Then define and call a function to handle the event checkout.session.async_payment_succeeded
    //     break;
    //   // ... handle other event types
    //   default:
    //     console.log(`Unhandled event type ${event.type}`);
    // }

    // Return a 200 response to acknowledge receipt of the event
    return NextResponse.json({ receive: true }, { status: 200 });
    // })
  }
};

export { handler as Get, handler as POST };
