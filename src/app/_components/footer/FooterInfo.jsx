import React from "react";

const FooterInfo = () => {
  return (
    <div className="page--footer__info l-4 m-6 c-12">
      <div className="page--footer__info--wrapper">
        <div className="page--footer__info--logo">
          <div className="header--logo black">
            <img src="https://i.ibb.co/Kr7fQvr/logo.png" alt="logo page" />
            <h2>
              Pet<span>Spa</span>
            </h2>
          </div>
        </div>
        <div className="page--footer__info--policy">
          <h6>
            © 2023 Petal, Đội Ngũ Dịch Vụ Đã Được Bảo Vệ | Chính Sách Bảo Mật
          </h6>
        </div>
      </div>
    </div>
  );
};

export default FooterInfo;
