import React from "react";
import data from "@/app/data.json";
import PathLink from "@/app/_components/PathLink";

const AboutSection = () => {
  return (
    <section className="about--section">
      <div className="container">
        <PathLink content="About" />
        <div className="line"></div>
        <div className="about--section__wrapper">
          <div className="about--section__history row">
            <div className="about--section__history--info l-4 m-12 c-12">
              <h3 className="about--title">Our Story</h3>
              <h6>
                In 2008, founders Mike and Adam—fresh off Wall Street—launched
                Throw Me A Bone with the idea of creating a more personalized,
                convenient and accessible pet-care service in New York City.
                What began as a small but thriving dog-walking business on the
                Upper East Side quickly became a 10-person operation within two
                years. By 2011, Throw Me A Bone expanded beyond dog walking to
                offer pet sitting (for cats, too!), grooming and dog training,
                providing in-home services across much of Manhattan. In 2017, we
                opened our first full-service pet care facility in Midtown West
                complete with a pet spa, playroom, and dog run. Today, we are
                operating 7 facility locations with a team of over 35 dedicated
                Pet Care Specialists who provide over 200 services a day across
                Manhattan, Brooklyn, and Queens. High quality, comprehensive pet
                care has never been more accessible, and we are proud to be a
                leader in enhancing the lives of New York City is pets.
              </h6>
            </div>
            <div className="about--section__picture l-7 m-12 c-12">
              <div
                className="about--image"
                style={{
                  backgroundImage: `url("https://i.ibb.co/FWMczSZ/about-ceo.jpg")`,
                }}
              ></div>
            </div>
          </div>
          <div className="about--section__mission">
            <div className="about--section__mission--info text-center">
              <h3 className="about--title">Our Mission</h3>
              <h6>
                To enrich the lives of each and every pet in our care while
                delivering value, convenience, and peace of mind to their
                owners.
              </h6>
            </div>
          </div>
          <div className="about--section__principles row">
            <div className="about--section__picture l-7 m-12 c-12">
              <div
                className="about--image"
                style={{
                  backgroundImage: `url("https://i.ibb.co/fCY9sy4/about-2.jpg")`,
                }}
              ></div>
            </div>
            <div className="about--section__principles--info l-4 m-12 c-12">
              <h3 className="about--title">Our Guiding Principles</h3>
              <div className="principles-list">
                {data["principles"].map((principle, index) => (
                  <div className="principles-list__name" key={index}>
                    <h4>{principle.name}</h4>
                    <h6>{principle.description}</h6>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
