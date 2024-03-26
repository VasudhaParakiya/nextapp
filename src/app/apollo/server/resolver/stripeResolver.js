import { Cart } from "@/app/lib/models/addToCartModal";
import { stripe } from "../../../lib/utils/stripe";
import { combineResolvers } from "graphql-resolvers";
import { isAuthenticated } from "../middleware/authentication";

// line_items: [
//   {
//     price_data: {
//       currency: "usd",
//       product_data: {
//         name: "Product Name",
//       },
//       unit_amount: 1000, // in cents
//     },
//     quantity: 1,
//   },
// ],
const createSession = combineResolvers(
  isAuthenticated,
  async (_, args, { user }) => {
    try {
      const cart = await Cart.findOne({ userId: user._id });

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],

        line_items: cart.product.map((productItem) => ({
          price_data: {
            currency: "usd",
            product_data: {
              name: productItem.productName, // Assuming 'name' is a property of your product item
            },
            unit_amount: productItem.price * 100, // Assuming 'price' is in dollars
          },
          quantity: productItem.quantity,
        })),

        metadata: {
          cart: JSON.stringify(cart),
        },
        mode: "payment",
        success_url: `${process.env.ENROK_URL}/success`,
        cancel_url: `${process.env.ENROK_URL}/cancel`,
      });
      // console.log("🚀 ~ createSession ~ session:", session.id);

      return { sessionId: session.id };
    } catch (error) {
      console.error(error);
      return { error: "Failed to create session" };
    }
  }
);

const stripeResolver = {
  Mutation: {
    createSession,
  },
};

export default stripeResolver;
