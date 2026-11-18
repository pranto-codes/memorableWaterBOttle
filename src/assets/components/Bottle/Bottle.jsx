import React from "react";
import "./Bottle.css";

const Bottle = ({ bottle, handleAddToCart }) => {
  const { img, name, price, stock } = bottle;

  const isOutOfStock = stock <= 0;

  return (
    <article className="product-card">
      <div className="product-image">
        <span className="product-tag">EVERYDAY ESSENTIAL</span>

        <img src={img} alt={name} loading="lazy" />

        {isOutOfStock && (
          <div className="out-of-stock-overlay">Out of stock</div>
        )}
      </div>

      <div className="product-info">
        <div className="product-top">
          <h3>{name}</h3>
          <span className="product-price">${Number(price).toFixed(2)}</span>
        </div>

        <p className="product-description">
          A thoughtful companion for your everyday hydration.
        </p>

        <div className="product-bottom">
          <span className={`stock-status ${isOutOfStock ? "stock-empty" : ""}`}>
            <span className="stock-dot"></span>
            {isOutOfStock ? "Out of stock" : `${stock} available`}
          </span>

          <button
            className="add-to-cart-btn"
            onClick={() => handleAddToCart(bottle)}
            disabled={isOutOfStock}
            aria-label={`Add ${name} to shopping cart`}
          >
            {isOutOfStock ? "Unavailable" : "Add to bag"}
            {!isOutOfStock && <span>+</span>}
          </button>
        </div>
      </div>
    </article>
  );
};

export default Bottle;
