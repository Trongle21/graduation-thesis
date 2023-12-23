"use client"

import React from "react";
import HeroSection from "@/app/_components/HeroSection";
import SectionServiceBook from "./SectionServiceBook";

const ServiceBook = () => {
  return (
    <main>
      <HeroSection
        backgroundImg="https://i.ibb.co/y6n9rt2/service-bg-1.jpg"
        content="We love pets too"
        des="Your pet will have the environment of home, familiar smells, sights, and sounds, as well as food and treats"
      />
      <SectionServiceBook />
    </main>
  );
};

export default ServiceBook;
