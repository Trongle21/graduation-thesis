"use client"

import React, { useState } from "react";
import data from "@/app/data.json";
import Link from "next/link";

const ServicePrice = () => {
  const [hoverPackage, setHoverPackage] = useState(1);
  const [choosePackage, setIsChoosePackage] = useState(null);
  //   const { isShowPackage, onShowPackage } = useAppContext();
  const homePackage = data["homePackage"];

  // let isShowPackage = null;

  return (
    <section className="service-prices--section container-padding">
      <div className="service-prices--section__img"></div>
      <div className="container">
        <h4 className="heading-lg text-center fw-800">Special Package</h4>
        <h2 className="heading-sm text-center margin-bottom">
          We offer special package just for you and your little family
        </h2>
        <div className="pricing--plan_list padding-bottom row">
          {homePackage.map((specialPackage, index) => (
            <div
              className={`plan--price l-4 m-12 c-12 ${
                index === hoverPackage ? "scale" : ""
              }`}
              key={index}
              onMouseOver={() => setHoverPackage(5)}
              onClick={() => setIsChoosePackage(index)}
            >
              <div
                className="plan--price__image"
                style={{ backgroundImage: `url(${specialPackage.image})` }}
                // onClick={onShowPackage}
              >
                <div className="plane--price__image-info">
                  <p>{specialPackage.name}</p>
                  <h3>
                    <span>$</span>
                    {specialPackage.price} <span>/Visit</span>
                  </h3>
                </div>
                <div className="plane--overlay"></div>
              </div>
              <div
                // className={`plane--price__info ${isShowPackage ? "show" : ""}`}
                className="plane--price__info"
              >
                <ul>
                  {specialPackage.packages.map((special, index) => (
                    <li key={index}>{special}</li>
                  ))}
                </ul>
              </div>
              <Link href="/service" className="plane--price__btn">
                <button className="btn btn--primary">Buy Now</button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicePrice;
