"use client";

import React from "react";
import data from "@/app/data.json";
import Button from "@/app/_components/Button";
import Link from "next/link";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const homeHero = data["homeHero"];

const HeroSection = () => {
  const handlePrevImg = () => {
    const lists = document.querySelectorAll(".hero--content__img");
    const heroContent = document.querySelector(".hero--content");
    const newImg = lists[lists.length - 1];

    heroContent.prepend(newImg);
  };

  const handleNextImg = () => {
    const lists = document.querySelectorAll(".hero--content__img");
    const heroContent = document.querySelector(".hero--content");
    const newImg = lists[0];
    heroContent.appendChild(newImg);
  };

  return (
    <section className="hero--section">
      <div className="hero--section__container">
        <div className="hero--content">
          {homeHero.map((hero, index) => (
            <div
              className="hero--content__img"
              key={index}
              style={{ backgroundImage: `url(${hero.image})` }}
            >
              <div className="hero--content__detail">
                <div className="content--info">{hero.name}</div>
                <div className="content--info__des">{hero.description}</div>
                <Link href="/service">
                  <Button className={hero.button} content="Book a Schedule" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="buttons">
        <button id="prev" onClick={handlePrevImg}>
          <FaArrowLeft />
        </button>
        <button id="next" onClick={handleNextImg}>
          <FaArrowRight />
        </button>
      </div>
    </section>
  );
};

export default HeroSection;
