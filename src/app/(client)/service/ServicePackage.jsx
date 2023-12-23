"use client"

import React, { useState } from "react";
import data from "@/app/data.json";
import ServiceDogWalking from "./ServiceDogWalking";
import ServiceGrooming from "./ServiceGrooming";
import ServiceBoarding from "./ServiceBoarding";
import ServicePetSitting from "./ServicePetSitting";

const ServicePackage = () => {
  const handleChoosePackage = (id) => {
    const offset = document.querySelector(`.${id}`).offsetTop - 120;

    window.scrollTo({
      top: offset,
      behavior: "smooth",
    });
  };

  return (
    <div className="service--section__page--wrapper_pc row">
      <div className="service--section__page--list">
        <ul>
          {data["data_service"].map((service, index) => (
            <li
              id={service.id}
              key={index}
              onClick={() => handleChoosePackage(service.id)}
            >
              {service.name}
            </li>
          ))}
        </ul>
      </div>
      <div className="service--section__page-info l-10 m-10">
        <ServiceDogWalking />
        <ServiceGrooming />
        <ServiceBoarding />
        <ServicePetSitting />
      </div>
    </div>
  );
};

export default ServicePackage;
