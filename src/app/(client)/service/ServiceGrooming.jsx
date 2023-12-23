import React, { useState } from "react";
import data from "@/app/data.json";
import Link from "next/link";
import { AiOutlinePlus } from "react-icons/ai";

const ServiceGrooming = () => {
  const [isShowGrooming, setIsShowGrooming] = useState();
  return (
    <div className="service--blog service-2 service--padding">
      <div className="service--wrapper row">
        <div className="service--image l-2 m-2">
          <img src="https://i.ibb.co/bgymvJT/service-2.webp" alt="" />
        </div>
        <div className="service--des l-10 m-10">
          <div className="service--title">
            <div
              className="service--title--wrapper"
              onClick={() => setIsShowGrooming(!isShowGrooming)}
            >
              <div className="service--title__mb">
                <div className="service--image__mb">
                  <img src="https://i.ibb.co/bgymvJT/service-2.webp" alt="" />
                </div>
                <h6>Grooming</h6>
              </div>
              <div
                className={`service--mb__icon ${
                  isShowGrooming ? "rotate" : ""
                }`}
              >
                <AiOutlinePlus />
              </div>
            </div>
            <Link
              href="/service/serviceBook"
              className={`service--mb ${
                isShowGrooming ? "show--service" : "hidden--service"
              }`}
            >
              <button className="btn btn--secondary">Book Now</button>
            </Link>
          </div>
          <div
            className={`service--mb ${
              isShowGrooming ? "show--service" : "hidden--service"
            }`}
          >
            <h5>Monday - Sunday / 8:00am - 6:00pm</h5>
            <p>
              We offer a full range of spa and grooming services. All grooming
              options include a complete organic and hypoallergenic bath as well
              as detailed nose-to-tail attention. Pricing may vary due to size,
              the condition of the coat, matting, knots and the length of hair.
            </p>
            <div className="service--content row">
              <div className="service--content__info luxury--bath l-6 m-6 c-12">
                <div className="service--content__price">
                  <h6>The Luxury Bath</h6>
                  <h6>$50</h6>
                </div>
                <ul>
                  {data["grooming"]["luxuryBath"].map((service, index) => (
                    <li key={index}>
                      <p>{service.name}</p>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="service--content__info full--groom l-6 m-6 c-12">
                <div className="service--content__price">
                  <h6>The Full Groom</h6>
                  <h6>$120</h6>
                </div>
                <ul>
                  {data["grooming"]["fullGroom"].map((service, index) => (
                    <li key={index}>
                      <p>{service.name}</p>
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

export default ServiceGrooming;
