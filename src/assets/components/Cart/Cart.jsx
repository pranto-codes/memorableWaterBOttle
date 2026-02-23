import React from "react";
import Bottle from "../Bottle/Bottle";
import "./cart.css";

const Cart = ({ cart, handleRemoveFCart }) => {
  return (
    <div className="cart_container">
      {cart.map((bottle) => (
        <div key={bottle.id}>
          <img src={bottle.img} />
          <button onClick={() => handleRemoveFCart(bottle.id)}>
            Remove item
          </button>
        </div>
      ))}
    </div>
  );
};

export default Cart;
