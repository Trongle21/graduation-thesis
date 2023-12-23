import Link from "next/link";
import React from "react";

const GiftSection = () => {
  return (
    <section className="gift--section container-padding">
      <div className="gift--section__img"></div>
      <div className="container padding-bottom">
        <h4 className="heading-lg text-center fw-800">Contact Us </h4>
        <h2 className="heading-sm text-center margin-bottom">
          Our store is hard-working employees
        </h2>
        <div className="gift--section__wrapper row">
          <div className="gift--section__wrapper--info l-6 m-6">
            <h1>Get Contact Us!</h1>
            <p>
              Contact our customer services and get your special gift for the
              first package purchase
            </p>
            <Link href="/contact">
              <button className="btn btn--primary">Contact Us</button>
            </Link>
          </div>
          <div
            className="gift--section__wrapper--image l-6 m-6"
            style={{
              backgroundImage: `url("https://i.ibb.co/92M0V6c/gift-1.png")`,
            }}
          ></div>
        </div>
      </div>
    </section>
  );
};

export default GiftSection;
