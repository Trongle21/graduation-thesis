import React from "react";
import HeroSection from "@/app/_components/HeroSection";
import AboutSection from "./AboutSection";
import Cart from "@/app/_components/Cart";

const About = () => {
  return (
    <main>
      <HeroSection
        backgroundImg="https://i.ibb.co/84kM03L/about-bg-1.jpg"
        content="You can count on us"
        des="Pet sitting is a cost-effective way to comfort the least amount of stress on your animal by allowing your pet to maintain as much of its daily routine as possible"
      />
      <AboutSection />
      <Cart />
    </main>
  );
};

export default About;
