import React from "react";
import HeroSection from "./HeroSection";
import ServiceSection from "./ServiceSection";
import ServicePrice from "./ServicePrice";
import TeamMember from "./TeamMember";
import GiftSection from "./GiftSection.jsx";
import Cart from "@/app/_components/Cart";

const Home = () => {
  return (
    <main>
      <HeroSection />
      <ServiceSection />
      <ServicePrice />
      <TeamMember />
      <GiftSection />
      <Cart />
    </main>
  );
};

export default Home;
