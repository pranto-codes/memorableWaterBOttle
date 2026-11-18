const CART_KEY = "cart";

// Get cart product IDs from localStorage
const getFLS = () => {
  try {
    const storedCart = localStorage.getItem(CART_KEY);

    if (!storedCart) return [];

    const parsedCart = JSON.parse(storedCart);

    return Array.isArray(parsedCart) ? parsedCart : [];
  } catch (error) {
    console.error("Error reading cart from localStorage:", error);
    return [];
  }
};

// Save cart product IDs
const saveCartToLocalStorage = (cartIds) => {
  try {
    localStorage.setItem(CART_KEY, JSON.stringify(cartIds));
  } catch (error) {
    console.error("Error saving cart to localStorage:", error);
  }
};

// Add one product ID to cart
const addFLS = (id) => {
  const cart = getFLS();

  cart.push(id);

  saveCartToLocalStorage(cart);
};

// Remove only one occurrence of a product ID
const removeFLS = (id) => {
  const cart = getFLS();

  const index = cart.findIndex((cartId) => cartId === id);

  if (index !== -1) {
    cart.splice(index, 1);
  }

  saveCartToLocalStorage(cart);
};

// Remove every occurrence of a product ID
const removeAllFLS = (id) => {
  const cart = getFLS();

  const updatedCart = cart.filter((cartId) => cartId !== id);

  saveCartToLocalStorage(updatedCart);
};

// Clear the entire cart
const clearFLS = () => {
  localStorage.removeItem(CART_KEY);
};

export {
  getFLS,
  addFLS,
  removeFLS,
  removeAllFLS,
  clearFLS,
  saveCartToLocalStorage,
};
