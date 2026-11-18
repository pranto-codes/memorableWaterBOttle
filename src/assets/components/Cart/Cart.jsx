import React, { useMemo } from "react";
import "./cart.css";

const Cart = ({
  cart,
  subtotal,
  onIncrease,
  onDecrease,
  onRemove,
  onClear,
}) => {
  // Group repeated products and calculate their quantities
  const groupedCart = useMemo(() => {
    const grouped = [];

    cart.forEach((bottle) => {
      const existingBottle = grouped.find((item) => item.id === bottle.id);

      if (existingBottle) {
        existingBottle.quantity += 1;
      } else {
        grouped.push({
          ...bottle,
          quantity: 1,
        });
      }
    });

    return grouped;
  }, [cart]);

  const totalItems = cart.length;

  const handleCheckout = () => {
    alert("Checkout functionality will be available soon!");
  };

  return (
    <section className="cart_section" id="shopping-bag">
      <div className="cart_header">
        <div>
          <span className="section_eyebrow">YOUR SELECTION</span>
          <h2>Shopping bag</h2>
        </div>

        <span className="cart_item_count">
          {totalItems} {totalItems === 1 ? "item" : "items"}
        </span>
      </div>

      {groupedCart.length === 0 ? (
        <div className="empty_cart">
          <div className="empty_cart_icon">🛍️</div>
          <h3>Your bag is empty</h3>
          <p>Looks like you haven't found your favorite bottle yet.</p>
          <a href="#collection">Explore collection</a>
        </div>
      ) : (
        <div className="cart_layout">
          <div className="cart_products">
            {groupedCart.map((bottle) => (
              <article className="cart_product" key={bottle.id}>
                <div className="cart_product_image">
                  <img src={bottle.img} alt={bottle.name} />
                </div>

                <div className="cart_product_info">
                  <h3>{bottle.name}</h3>

                  <p className="cart_product_price">
                    ${Number(bottle.price).toFixed(2)}
                  </p>

                  <div className="cart_quantity_control">
                    <button
                      type="button"
                      onClick={() => onDecrease(bottle.id)}
                      aria-label={`Decrease ${bottle.name} quantity`}
                    >
                      −
                    </button>

                    <span>{bottle.quantity}</span>

                    <button
                      type="button"
                      onClick={() => onIncrease(bottle)}
                      disabled={bottle.quantity >= bottle.stock}
                      aria-label={`Increase ${bottle.name} quantity`}
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="cart_product_actions">
                  <strong>
                    ${(Number(bottle.price) * bottle.quantity).toFixed(2)}
                  </strong>

                  <button
                    type="button"
                    className="remove_product_btn"
                    onClick={() => onRemove(bottle.id)}
                  >
                    Remove
                  </button>
                </div>
              </article>
            ))}

            <button type="button" className="clear_cart_btn" onClick={onClear}>
              Clear bag
            </button>
          </div>

          <aside className="cart_summary">
            <h3>Order summary</h3>

            <div className="summary_row">
              <span>Items ({totalItems})</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>

            <div className="summary_row">
              <span>Shipping</span>
              <span>Calculated at checkout</span>
            </div>

            <div className="summary_divider"></div>

            <div className="summary_total">
              <strong>Subtotal</strong>
              <strong>${subtotal.toFixed(2)}</strong>
            </div>

            <button
              type="button"
              className="checkout_btn"
              onClick={handleCheckout}
            >
              Continue to checkout
            </button>

            <p className="checkout_note">
              Secure checkout experience coming soon.
            </p>
          </aside>
        </div>
      )}
    </section>
  );
};

export default Cart;
