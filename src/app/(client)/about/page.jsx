import React from "react";
import HeroSection from "@/app/_components/HeroSection";
import AboutSection from "./AboutSection";
import Cart from "@/app/_components/Cart";

const About = () => {
  return (
    <main>
      <HeroSection
        backgroundImg="https://i.ibb.co/84kM03L/about-bg-1.jpg"
        content="Bạn có thể tin tưởng vào chúng tôi"
        des="Dịch vụ ngồi nhà cho thú cưng là một cách hiệu quả về chi phí để giảm thiểu áp lực tối thiểu đối với thú cưng của bạn bằng cách cho phép thú cưng duy trì nhiều phần nào của lịch trình hàng ngày của mình nhất có thể"
      />

      <AboutSection />
      <Cart />
    </main>
  );
};

export default About;
