"use client";

import React from "react";
import HeroSection from "@/app/_components/HeroSection";
import ContactSection from "./ContactSection";
import Cart from "@/app/_components/Cart";
import CartIcon from "@/app/_components/CartIcon";
import useAppContext from "@/app/_hooks/useAppContext";

const Contact = () => {
  const { isShowCart } = useAppContext();

  return (
    <main>
      <HeroSection
        backgroundImg="https://i.ibb.co/mDFGRFh/contact-bg-1.jpg"
        content="We enjoy our work"
        des="You can’t buy happiness but you can buy lil doggo and that’s pretty much it"
      />
      <ContactSection />
      <Cart />
      {!isShowCart && <CartIcon />}
    </main>
  );
};

export default Contact;
