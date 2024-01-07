"use client";

import React from "react";
import HeroSection from "@/app/_components/HeroSection";
import Cart from "@/app/_components/Cart";
import useAppContext from "@/app/_hooks/useAppContext";
import OrderSection from "./OrderSection";

const Order = () => {
  const { isShowCart } = useAppContext();

  return (
    <main>
      <HeroSection
        backgroundImg="https://i.ibb.co/mDFGRFh/Order-bg-1.jpg"
        content="Chúng tôi đam mê công việc của mình"
        des="Bạn không thể mua được hạnh phúc, nhưng bạn có thể mua một chú chó nhỏ và đó là khá là đủ"
      />

      <OrderSection />
      <Cart />
    </main>
  );
};

export default Order;
