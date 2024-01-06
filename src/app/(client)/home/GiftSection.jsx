import Link from "next/link";
import React from "react";

const GiftSection = () => {
  return (
    <section className="gift--section container-padding">
      <div className="gift--section__img"></div>
      <div className="container padding-bottom">
        <h4 className="heading-lg text-center fw-800">Liên hệ</h4>
        <h2 className="heading-sm text-center margin-bottom">
          Đội ngũ nhân viên chăm chỉ tại cửa hàng của chúng tôi
        </h2>
        <div className="gift--section__wrapper row">
          <div className="gift--section__wrapper--info l-6 m-6">
            <h1>Liên hệ với chúng tôi!</h1>
            <p>
              Liên hệ với dịch vụ khách hàng của chúng tôi và nhận quà đặc biệt
              cho gói dịch vụ đầu tiên của bạn
            </p>
            <Link href="/contact">
              <button className="btn btn--primary">Liên hệ Ngay</button>
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
