import React from "react";
import data from "@/app/data.json";
import Link from "next/link";

const ServiceSection = () => {
  const homeService = data["homeService"];
  return (
    <section className="service--section container-padding">
      <div className="container">
        <h4 className="heading-lg text-center fw-800">What Can We Do</h4>
        <h2 className="heading-sm text-center margin-bottom">
          We lock after little your family, we ensure that we will give the best
          treat for your little family
        </h2>
        <div className="service--section__list padding-bottom row">
          {homeService.map((service, index) => (
            <div className="service--list l-3 m-6 c-12" key={index}>
              <Link href={service.href} className="service--list__item  orange">
                <div
                  className="service--list__item--img box-sd-violet"
                  style={{ backgroundImage: `url(${service.image})` }}
                ></div>
                <h3 className="fw-700">{service.name}</h3>
                <p className="text-center margin-top ">{service.description}</p>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceSection;
