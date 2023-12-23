import React from "react";
import data from "@/app/data.json";

const FooterNav = () => {
  const footerInfoSp = data["footerInfoSp"];
  const footerInfoAbout = data["footerInfoAbout"];

  return (
    <div className="page--footer__link l-4 m-6 c-12">
      <div className="page--footer__link--wrapper row">
        <nav className="page--footer__link--list l-4 m-4 c-4">
          <h6 className=" fw-800">Support</h6>
          <ul className="footerInfoSp">
            {footerInfoSp.map((infoSp, index) => (
              <a key={index} href={infoSp.url}>
                {infoSp.name}
              </a>
            ))}
          </ul>
        </nav>

        <nav className="page--footer__link--list l-4 m-4 c-4">
          <h6 className=" fw-800">About</h6>
          <ul className="footerInfoAbout">
            {footerInfoAbout.map((infoAb, index) => (
              <a key={index} href={infoAb.url}>
                {infoAb.name}
              </a>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default FooterNav;
