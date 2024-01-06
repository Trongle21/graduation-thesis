import React from "react";
import PathLink from "@/app/_components/PathLink";
import ServicePackage from "./ServicePackage";

const ServiceSection = () => {
  return (
    <section className="service--section__page pc container--padding">
      <div className="container--service">
        <PathLink content="Dịch vụ" />
        <div className="line" />
        <ServicePackage />
      </div>
    </section>
  );
};

export default ServiceSection;
