"use client";

import React from "react";
import ProductSection from "./ProductSection";
import HeroSection from "@/app/_components/HeroSection";
import Paginate from "./Paginate";

const Product = () => {
  return (
    <main>
      <HeroSection
        backgroundImg="https://i.ibb.co/njr1t1X/product-bg-1.jpg"
        content="Chúng tôi thích công việc của mình"
        des="Đây là một lựa chọn xuất sắc để chăm sóc thú cưng của bạn, với thời gian vui chơi và đi tiểu khác nhau, và đặc biệt không có sự hiện diện của bạn xung quanh."
      />

      <ProductSection />
      <Paginate />
    </main>
  );
};

export default Product;
