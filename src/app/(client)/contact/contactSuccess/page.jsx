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
          <div className="content--hero__name">Cảm ơn đã liên hệ với chúng tôi</div>
          <div className="content--hero__des">Ý kiến phản hồi sẽ sớm được gửi đến bạn!</div>
        </div>
      </div>
    </section>
  );
};

export default ContactSuccess;
