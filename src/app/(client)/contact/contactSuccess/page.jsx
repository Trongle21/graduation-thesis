import React from "react";

const ContactSuccess = () => {
  return (
    <section className="section--hero">
      <div
        className="section--hero__image"
        style={{
          backgroundImage: `url("https://i.ibb.co/ZGhBT0Y/contact-success-bg.jpg")`,
        }}
      >
        <div className="section--hero__wrapper">
          <div className="content--hero__name">Thank you for contact</div>
          <div className="content--hero__des">See you next time shopping!</div>
        </div>
      </div>
    </section>
  );
};

export default ContactSuccess;
