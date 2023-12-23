"use client";

import React from "react";
import HeroSection from "@/app/_components/HeroSection";
import SectionDetail from "./SectionDetail";
import Cart from "@/app/_components/Cart";
import { useSelector } from "react-redux";

const DetailProduct = ({ params }) => {
  const loading = useSelector((state) => state.api.loading);
  const error = useSelector((state) => state.api.error);

  return (
    <main>
      <HeroSection
        backgroundImg="https://i.ibb.co/kmKngmQ/detail-product-bg-1.jpg"
        content="Adopt a cat, save the world"
        des="For your furry or flying or finned friends."
      />
      {loading ? (
        <div>Loading ...</div>
      ) : error ? (
        <div>Error</div>
      ) : (
        <SectionDetail id={params.id} />
      )}
      <Cart />
    </main>
  );
};

export default DetailProduct;
