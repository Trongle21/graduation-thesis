import React from "react";
import HeroSection from "@/app/_components/HeroSection";
import SectionPay from "./SectionPay";

const Payment = () => {
  return (
    <main>
      <HeroSection
        backgroundImg="https://i.ibb.co/wKcTxM6/payment-bg-1.jpg"
        content="Cho cuộc sống tự nhiên hoàn toàn của thú cưng của bạn"
        des="Bạn không thể mua được hạnh phúc, nhưng bạn có thể mua được Husky và đó là hầu hết những gì bạn cần"
      />

      <SectionPay />
    </main>
  );
};

export default Payment;
