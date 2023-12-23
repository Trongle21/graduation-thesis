import React from "react";
import HeroSection from "@/app/_components/HeroSection";
import SectionPay from "./SectionPay";

const Payment = () => {
  return (
    <main>
      <HeroSection
        backgroundImg="https://i.ibb.co/wKcTxM6/payment-bg-1.jpg"
        content="For your pet’s all natural life"
        des="You can’t buy happiness but you can buy Husky and that’s pretty much it"
      />
      <SectionPay />
    </main>
  );
};

export default Payment;
