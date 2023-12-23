import React, { useState } from "react";
import data from "@/app/data.json";
import Link from "next/link";
import { AiOutlinePlus } from "react-icons/ai";

const ServiceDogWalking = () => {
  const [isShowPetWalking, setIsShowPetWalking] = useState();

  

  return (
    <div className="service--blog service-1 service--padding">
      <div className="service--wrapper row">
        <div className="service--image l-2 m-2">
          <img src="https://i.ibb.co/GsY6JWd/service-1.webp" alt="" />
        </div>
        <div className="service--des l-10 m-10">
          <div className="service--title">
            <div
              className="service--title--wrapper"
              onClick={() => setIsShowPetWalking(!isShowPetWalking)}
            >
              <div className="service--title__mb">
                <div className="service--image__mb">
                  <img src="https://i.ibb.co/GsY6JWd/service-1.webp" alt="" />
                </div>
                <h6>Pet Walking</h6>
              </div>
              <div
                className={`service--mb__icon ${
                  isShowPetWalking ? "rotate" : ""
                }`}
              >
                <AiOutlinePlus />
              </div>
            </div>
            <Link
              href="/service/serviceBook"
              className={`service--mb ${
                isShowPetWalking ? "show--service" : "hidden--service"
              }`}
            >
              <button className="btn btn--secondary">Book Now</button>
            </Link>
          </div>
          <div
            className={`service--mb ${
              isShowPetWalking ? "show--service" : "hidden--service"
            }`}
          >
            <h5>Monday - Friday / 9:00am - 7:00pm</h5>
            <p>
              Your Pet is well-being relies upon routine and consistency, which
              is why we assign them a designated Pet Care Specialist and regular
              pick-up window.
            </p>
            <div className="service--content row">
              <div className="service--content__info cheap l-6 m-6 c-12">
                <div className="service--content__price">
                  <h6>30 Minus</h6>
                  <h6>$30</h6>
                </div>
                <ul>
                  {data["dog_walking"]["30 minus"].map((service, index) => (
                    <li key={index}>
                      <p>{service.name}</p>
                      <p>${service.price}</p>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="service--content__info expensive l-6 m-6 c-12">
                <div className="service--content__price">
                  <h6>60 Minus</h6>
                  <h6>$50</h6>
                </div>
                <ul>
                  {data["dog_walking"]["60 minus"].map((service, index) => (
                    <li key={index}>
                      <p>{service.name}</p>
                      <p>${service.price}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDogWalking;
