"use client"

import React from "react";
import ProductSection from "./ProductSection";
import HeroSection from "@/app/_components/HeroSection";
import Paginate from "./Paginate";

const Product = () => {
  return (
    <main>
      <HeroSection
        backgroundImg="https://i.ibb.co/njr1t1X/product-bg-1.jpg"
        content="We enjoy our work"
        des="  It is an excellent option for kenneling your pet, different turnout
            times for potty and play, and not to mention all of this stress is
            in addition to not having you around"
      />
      <ProductSection />
      <Paginate />
    </main>
  );
};

export default Product;
