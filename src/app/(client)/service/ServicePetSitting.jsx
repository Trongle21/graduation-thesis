import React, { useState } from "react";
import data from "@/app/data.json";
import Link from "next/link";
import { AiOutlinePlus } from "react-icons/ai";

const ServicePetSitting = () => {
  const [isShowPetSitting, setIsShowPetSitting] = useState();

  return (
    <div className="service--blog service-4 service--padding">
      <div className="service--wrapper row">
        <div className="service--image l-2 m-2">
          <img src="https://i.ibb.co/q7XqphM/service-4.png" alt="" />
        </div>
        <div className="service--des l-10 m-10">
          <div className="service--title">
            <div
              className="service--title--wrapper"
              onClick={() => setIsShowPetSitting(!isShowPetSitting)}
            >
              <div className="service--title__mb">
                <div className="service--image__mb">
                  <img src="https://i.ibb.co/q7XqphM/service-4.png" alt="" />
                </div>
                <h6>Pet Sitting</h6>
              </div>
              <div
                className={`service--mb__icon ${
                  isShowPetSitting ? "rotate" : ""
                }`}
              >
                <AiOutlinePlus />
              </div>
            </div>
            <Link
              href="/service/serviceBook"
              className={`service--mb ${
                isShowPetSitting ? "show--service" : "hidden--service"
              }`}
            >
              <button className="btn btn--secondary">Book Now</button>
            </Link>
          </div>
          <div
            className={`service--mb ${
              isShowPetSitting ? "show--service" : "hidden--service"
            }`}
          >
            <h5>Monday - Sunday / 8:00am - 6:00pm</h5>
            <p>
              For cats and puppies. Each 30-minute visit includes feeding/fresh
              water, litter/crate maintenance, and indoor playtime. Relief walks
              can be provided for puppies upon request.
            </p>
            <div className="service--content row">
              <div className="service--content__info pet--sitting l-12 m-12 c-12">
                <div className="service--content__price">
                  <h6>Pet Sitting</h6>
                </div>
                <ul>
                  {data["petSitting"].map((service, index) => (
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

export default ServicePetSitting;
