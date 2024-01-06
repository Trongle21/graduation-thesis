"use client";

import React from "react";
import HeroSection from "@/app/_components/HeroSection";
import ContactSection from "./ContactSection";
import Cart from "@/app/_components/Cart";

const Contact = () => {
  return (
    <main>
      <HeroSection
        backgroundImg="https://i.ibb.co/mDFGRFh/contact-bg-1.jpg"
        content="Chúng tôi thích công việc của mình"
        des="Bạn không thể mua được hạnh phúc, nhưng bạn có thể mua được một chú chó nhỏ và đó là hầu hết những gì bạn cần"
      />

      <ContactSection />
      <Cart />
    </main>
  );
};

export default Contact;
