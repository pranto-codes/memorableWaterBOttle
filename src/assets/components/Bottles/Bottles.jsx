import React, { use, useEffect, useMemo, useState } from "react";
import Bottle from "../Bottle/Bottle";
import Cart from "../Cart/Cart";
import "./Bottles.css";

import {
  addFLS,
  getFLS,
  removeFLS,
  saveCartToLocalStorage,
} from "../../../utilities/localStorage";

const Bottles = ({ bottlesPromise }) => {
  const bottles = use(bottlesPromise);

  const [cart, setCart] = useState([]);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("default");
  const [notification, setNotification] = useState("");

  // Restore cart from localStorage when bottles load
  useEffect(() => {
    const storedCartIds = getFLS();

    const restoredCart = storedCartIds
      .map((id) => bottles.find((bottle) => bottle.id === id))
      .filter(Boolean);

    setCart(restoredCart);
  }, [bottles]);

  // Show a temporary notification
  const showNotification = (message) => {
    setNotification(message);

    setTimeout(() => {
      setNotification("");
    }, 2500);
  };

  // Count how many times a product exists in the cart
  const getCartQuantity = (productId) => {
    return cart.filter((item) => item.id === productId).length;
  };

  // Add product to cart
  const handleAddToCart = (bottle) => {
    const currentQuantity = getCartQuantity(bottle.id);

    if (currentQuantity >= bottle.stock) {
      showNotification("Sorry! No more stock available.");
      return;
    }

    setCart((previousCart) => [...previousCart, bottle]);
    addFLS(bottle.id);

    showNotification(`${bottle.name} added to your bag.`);
  };

  // Increase product quantity
  const handleIncreaseQuantity = (bottle) => {
    const currentQuantity = getCartQuantity(bottle.id);

    if (currentQuantity >= bottle.stock) {
      showNotification("You have reached the available stock limit.");
      return;
    }

    setCart((previousCart) => [...previousCart, bottle]);
    addFLS(bottle.id);
  };

  // Decrease product quantity by one
  const handleDecreaseQuantity = (productId) => {
    const itemIndex = cart.findIndex((item) => item.id === productId);

    if (itemIndex === -1) return;

    setCart((previousCart) => {
      const updatedCart = [...previousCart];
      updatedCart.splice(itemIndex, 1);
      return updatedCart;
    });

    removeFLS(productId);
  };

  // Remove every quantity of a product
  const handleRemoveAllFromCart = (productId) => {
    const updatedCart = cart.filter((item) => item.id !== productId);

    setCart(updatedCart);

    saveCartToLocalStorage(updatedCart.map((item) => item.id));

    showNotification("Product removed from your bag.");
  };

  // Clear the complete cart
  const handleClearCart = () => {
    setCart([]);
    saveCartToLocalStorage([]);

    showNotification("Your bag has been cleared.");
  };

  // Search and sort products
  const filteredBottles = useMemo(() => {
    let result = [...bottles];

    if (search.trim()) {
      result = result.filter((bottle) =>
        bottle.name.toLowerCase().includes(search.toLowerCase()),
      );
    }

    if (sortBy === "low-to-high") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "high-to-low") {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === "name") {
      result.sort((a, b) => a.name.localeCompare(b.name));
    }

    return result;
  }, [bottles, search, sortBy]);

  // Calculate cart information
  const cartCount = cart.length;

  const subtotal = cart.reduce(
    (total, bottle) => total + Number(bottle.price),
    0,
  );

  return (
    <section className="bottles_section">
      <div className="collection_header">
        <div>
          <span className="section_eyebrow">OUR COLLECTION</span>
          <h2>Find your perfect bottle.</h2>
          <p>Thoughtfully designed bottles for everyday hydration.</p>
        </div>

        <div className="collection_stats">
          <div>
            <strong>{bottles.length}</strong>
            <span>Products</span>
          </div>

          <div>
            <strong>{cartCount}</strong>
            <span>In your bag</span>
          </div>
        </div>
      </div>

      <div className="collection_toolbar">
        <div className="search_box">
          <input
            type="search"
            placeholder="Search bottles..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            aria-label="Search bottles"
          />
        </div>

        <select
          value={sortBy}
          onChange={(event) => setSortBy(event.target.value)}
          aria-label="Sort products"
        >
          <option value="default">Featured</option>
          <option value="low-to-high">Price: Low to High</option>
          <option value="high-to-low">Price: High to Low</option>
          <option value="name">Name: A to Z</option>
        </select>
      </div>

      <div className="collection_content">
        <div className="bottles_container">
          {filteredBottles.length > 0 ? (
            filteredBottles.map((bottle) => (
              <Bottle
                key={bottle.id}
                bottle={bottle}
                handleAddToCart={handleAddToCart}
              />
            ))
          ) : (
            <div className="empty_search">
              <h3>No bottles found</h3>
              <p>Try searching with a different product name.</p>
            </div>
          )}
        </div>
      </div>

      <Cart
        cart={cart}
        subtotal={subtotal}
        onIncrease={handleIncreaseQuantity}
        onDecrease={handleDecreaseQuantity}
        onRemove={handleRemoveAllFromCart}
        onClear={handleClearCart}
      />

      {notification && (
        <div className="notification_toast" role="status">
          {notification}
        </div>
      )}
    </section>
  );
};

export default Bottles;
