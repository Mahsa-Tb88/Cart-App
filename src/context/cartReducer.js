export function cartReducer(state, action) {
  const { type, payload } = action;
  switch (type) {
    case "setCategories":
      return { ...state, categories: payload };
    case "setLoadingError":
      return { ...state, loadingError: payload };
    case "setIsLoading":
      return { ...state, isLoading: payload };
    case "addToCart":
      return {
        ...state,
        totalPrice: state.totalPrice + payload.product.price,
        shoppingProducts: [...state.shoppingProducts, payload],
      };
    case "updateShoppingProducts":
      const total = payload.reduce(
        (t, c) => t + c.product.price * c.numOfItem,
        0
      );
      return { ...state, totalPrice: total, shoppingProducts: payload };
    case "showingShoppingCart":
      return { ...state, isShowShoppingCart: payload };
  }
}
