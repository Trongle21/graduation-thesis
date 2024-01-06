import React from "react";
import HeroSection from "@/app/_components/HeroSection";
import ServiceSection from "./ServiceSection";
import useAppContext from "@/app/_hooks/useAppContext";
import Cart from "@/app/_components/Cart";

const Service = () => {
  return (
    <main>
      <HeroSection
        backgroundImg="https://i.ibb.co/R3pFqf8/service-bg-1.jpg"
        content="Chúng tôi yêu pet"
        des="Thú cưng của bạn sẽ có môi trường như ở nhà, với những mùi hương quen thuộc, cảnh đẹp và âm thanh, cũng như thức ăn và đặc sản"
      />

      <ServiceSection />
      <Cart />
    </main>
  );
};

export default Service;
