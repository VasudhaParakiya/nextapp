import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  "pk_test_51OvYQKSGpB8XuaFIC63uzCtO1ctQEVIX7wnWqRcM82rogrCIbo4ujB4h9rtVo1B3yOv9WdHbhYYUYOiNpVS7cgES00HJAXz76x"
);
// console.log(
//   "🚀 ~ process.env.STRIPE_PUBLIC_KEY:",
//   process.env.STRIPE_PUBLIC_KEY
// );


export async function redirectToCheckout(sessionId) {
  console.log("🚀 ~ redirectToCheckout ~ sessionId:", sessionId);
  const stripe = await stripePromise;
  const { error } = await stripe.redirectToCheckout({
    sessionId,
  });
  if (error) {
    console.error(error);
  }
}

// line_items: cart?.product?.map((cartItem) => ({
//   price_data: {
//     currency: "usd",
//     product_data: {
//       name: cartItem.price,
//     },
//     unit_amount: cartItem * 100,
//   },
//   quantity: cartItem.quantity,
// })),
