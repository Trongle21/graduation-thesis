import React from "react";
import useAppContext from "@/app/_hooks/useAppContext";
import { AiOutlineShoppingCart } from "react-icons/ai";

const CartIcon = () => {
  const { onOpenCart, lengthProductCart } = useAppContext();

  return (
    <div className="cart--icon" onClick={onOpenCart}>
      <i>
        <AiOutlineShoppingCart />
      </i>
      <div className="quantity--product">
        {lengthProductCart > 0 ? (
          <div className="number">{lengthProductCart}</div>
        ) : null}
      </div>
    </div>
  );
};

export default CartIcon;
