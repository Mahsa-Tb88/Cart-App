export function cartReducer(state, action) {
  const { type, payload } = action;
  switch (type) {
    case "setIsLoading":
      return { ...state, isLoading: payload };
    case "setCategories":
      return { ...state, categories: payload };
    case "setLoadingError":
      return { ...state, loadingError: payload };
    case "setProducts":
      return {
        ...state,
        products: payload.products,
        totalProduct: payload.totalProduct,
        currentPage: 1,
      };
    case "setCurrentPage":
      return { ...state, currentPage: payload };
    case "search":
      return { ...state, search: payload };
  }
}
