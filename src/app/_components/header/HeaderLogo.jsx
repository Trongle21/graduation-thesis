import React from "react";
import Link from "next/link";

const HeaderLogo = () => {
  return (
    <Link href="/" className="header--logo">
      <img src="https://i.ibb.co/Kr7fQvr/logo.png" alt="" />
      <h2>
        Pet<span>Spa</span>
      </h2>
    </Link>
  );
};

export default HeaderLogo;
