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
        content="We love pets too"
        des=" Your pet will have the environment of home, familiar smells,
              sights, and sounds, as well as food and treats"
      />
      <ServiceSection />
      <Cart />
    </main>
  );
};

export default Service;
