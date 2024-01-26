const successRate = 0.94;

async function getAllProducts() {
  await wait(1000);
  try {
    return JSON.parse(localStorage.products);
  } catch (e) {
    return [];
  }
}

function connectionError() {
  return {
    success: false,
    body: null,
    message: "Error Connection",
    code: 500,
  };
}

export async function getProducts(
  page = 1,
  limit = 6,
  search = "",
  category = ""
) {
  console.log(search);
  const products = await getAllProducts();
  if (Math.random() > successRate) {
    return connectionError();
  }

  if (!search) {
    search = "";
  }
  search = search.toLowerCase();

  let filteredProducts = products.filter(
    (p) => p.category === category || category === ""
  );

  filteredProducts = filteredProducts.filter((p) => {
    return p.title.includes(search);
  });

  const start = (page - 1) * limit;
  const result = filteredProducts.slice(start, limit + start);

  return {
    success: true,
    body: result,
    message: "Done Successfully",
    total: {
      filtered: result.length,
      all: filteredProducts.length,
    },
    code: 200,
  };
}

export async function getProductById(id) {
  const products = await getAllProducts();
  if (Math.random() > successRate) {
    return connectionError();
  }

  const product = products.find((p) => p.id === parseInt(id));

  if (product) {
    return {
      success: true,
      body: product,
      message: "read the product successfully",
      code: 200,
    };
  } else {
    return {
      success: false,
      body: null,
      message: " The Product was not found",
      code: 404,
    };
  }
}

export async function getAllCategories() {
  const products = await getAllProducts();
  if (Math.random() > successRate) {
    return connectionError();
  }

  const cats = [];
  for (let product of products) {
    if (!cats.includes(product.category)) {
      cats.push(product.category);
    }
  }

  return {
    success: true,
    body: cats,
    message: "Did Successfully",
  };
}
