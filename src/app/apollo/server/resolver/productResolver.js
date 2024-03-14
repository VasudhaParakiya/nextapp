const { Product } = require("@/app/lib/models/productModal");

const singleProduct = async (_, args) => {
  // console.log("🚀 ~ singleProduct ~ args:", args);
  try {
    const findProduct = await Product.findOne({ _id: args._id }).populate([
      { path: "brand", select: "brand" },
      { path: "category", select: "category" },
    ]);
    // console.log("🚀 ~ singleProduct ~ findProduct:", findProduct);

    if (!findProduct) return new Error("product not found");
    return findProduct;
  } catch (error) {
    console.log("🚀 ~ addProduct ~ error:", error);
  }
};

const getAllProduct = async (_, { input }) => {
  const { searchText, category, brand, sort } = input;
  // console.log("🚀 ~ getAllProduct ~ category:", category);
  // console.log("🚀 ~ getAllProduct ~ input:", input);

  try {
    let regexSearch = searchText ? new RegExp(searchText, "i") : "";
    let query = {};
    if (searchText) {
      query.$or = [{ productName: { $regex: regexSearch } }];
    }

    if (category) {
      query.category = category;
    }
    if (brand) {
      query.brand = brand;
    }

    let sortCriteria = {}; // Initialize an empty object for sorting criteria
    if (sort === "lowest") {
      sortCriteria = { price: 1 }; // Sorting by price in ascending order
    } else if (sort === "height") {
      sortCriteria = { price: -1 }; // Sorting by price in descending order
    } else if (sort === "a-z") {
      sortCriteria = { productName: 1 };
    } else if (sort === "z-a") {
      sortCriteria = { productName: -1 };
    }

    const products = await Product.find(query)
      .populate([
        { path: "brand", select: "brand" },
        { path: "category", select: "category" },
      ])
      .sort(sortCriteria) // Apply the sorting criteria
      .exec();

    if (!products) throw new Error("product not found");

    return { totalProduct: products.length, products: products };
  } catch (error) {
    console.log("🚀 ~ getAllProduct ~ error:", error);
  }
};

const addProduct = async (_, { input }) => {
  // console.log("🚀 ~ addProduct ~ input:", input);
  try {
    const newProduct = await Product.create(input);
    if (!newProduct) return new Error("product not added");
    // newProduct.save();
    return newProduct;
  } catch (error) {
    console.log("🚀 ~ addProduct ~ error:", error);
  }
};

const productResolver = {
  Query: {
    getAllProduct,
    singleProduct,
  },
  Mutation: {
    addProduct,
  },
};

export default productResolver;
