

import React from "react";
import FooterInfo from "./FooterInfo";
import FooterNav from "./FooterNav.jsx";
import FooterContact from "./FooterContact.jsx";

const Footer = () => {
  return (
    <footer className="page-footer--section">
      <div className="container">
        <div className="page--footer row">
          <FooterInfo />
          <FooterNav />
          <FooterContact />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
