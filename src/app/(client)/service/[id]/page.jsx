"use client";

import React from "react";
import HeroSection from "@/app/_components/HeroSection";
import SectionServiceBook from "./SectionServiceBook";
import Cart from "@/app/_components/Cart";
const ServiceBook = () => {
  return (
    <main>
      <HeroSection
        backgroundImg="https://i.ibb.co/y6n9rt2/service-bg-1.jpg"
        content="Chúng tôi yêu thú cưng"
        des="Thú cưng của bạn sẽ có môi trường như ở nhà, với những mùi hương quen thuộc, cảnh đẹp và âm thanh, cũng như thức ăn và đặc sản"
      />

      <SectionServiceBook />
      <Cart />
    </main>
  );
};

export default ServiceBook;
