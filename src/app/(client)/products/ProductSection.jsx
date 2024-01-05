import React from "react";
import ProductInfo from "./ProductInfo";
import ProductList from "./ProductList";
import Cart from "@/app/_components/Cart.jsx";
import PathLink from "@/app/_components/PathLink";
import { useSelector } from "react-redux";

const ProductSection = () => {
  return (
    <section className="product--section">
      <div className="container">
        <PathLink content="Product" />
        <div className="line"></div>
        <div className="product--section__wrapper">
          <ProductInfo />
          <ProductList />
          <Cart />
        </div>
      </div>
    </section>
  );
};

export default ProductSection;
