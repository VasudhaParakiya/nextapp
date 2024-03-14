const productReducer = (state, action) => {
  switch (action.type) {
    // case "SET_LOADING":
    //   return { ...state, isLoading: true };

    // case "SET_PRODUCTS":
    //   const homeProduct = action.payload.filter((curProduct) => {
    //     return curProduct.homeProduct === true;
    //   });
    //   // action.payload = puro product object
    //   return {
    //     ...state,
    //     // isLoading: false,
    //     product: action.payload,
    //     homeProduct: homeProduct,
    //   };

    // case "IS_ERROR":
    //   return {
    //     ...state,
    //     // isLoading: false,
    //     isError: true,
    //   };

    // case "SET_SINGLE_LOADING":
    //   return { ...state, isSingleLoading: true };

    // case "SET_SINGLE_PRODUCTS":
    //   // action.payload = puro product object
    //   return {
    //     ...state,
    //     isSingleLoading: false,
    //     singleProduct: action.payload,
    //   };

    default:
      return state;
  }
};

export default productReducer;
