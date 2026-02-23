import React, { use, useEffect, useState } from "react";
import Bottle from "../Bottle/Bottle";
import "./Bottles.css";
import { addFLS, getFLS, removeFLS } from "../../../utilities/localStorage";
import Cart from "../Cart/Cart";

const Bottles = ({ bottlesPromise }) => {
  const bottles = use(bottlesPromise);
  const [cart, setCart] = useState([]);
  //use effect
  useEffect(() => {
    const storedCartIDS = getFLS();
    //console.log(storedCartIDS, bottles);

    const storedCart = [];

    for (const id of storedCartIDS) {
      // console.log(id);

      const cartBottle = bottles.find((bottle) => bottle.id === id);
      if (cartBottle) {
        storedCart.push(cartBottle);
      }
    }
    console.log("stored cart", storedCart);
    setCart(storedCart);
  }, [bottles]);

  //console.log(bottles);

  const handleAddToCart = (bottle) => {
    //  console.log("added to cart", bottle);
    const newCart = [...cart, bottle];
    setCart(newCart);

    // save bottle id to local storage
    addFLS(bottle.id);
  };

  const handleRemoveFCart = (id) => {
    console.log("remove from cart", id);

    const remainingCart = cart.filter((bottle) => bottle.id !== id);
    setCart(remainingCart);
    removeFLS(id);
  };

  return (
    <div>
      <h3>Bottles : {bottles.length}</h3>
      <p>Added to Cart : {cart.length}</p>
      <Cart handleRemoveFCart={handleRemoveFCart} cart={cart}></Cart>
      <div className="bottles_container">
        {bottles.map((bottle) => (
          <Bottle bottle={bottle} handleAddToCart={handleAddToCart}></Bottle>
        ))}
      </div>
    </div>
  );
};

export default Bottles;
