import React from "react";
import Link from "next/link";
import data from "@/app/data.json";

const HeaderNav = () => {
  const navigation = data["navigation"];

  return (
    <nav className="header--nav">
      <ul className="header--nav__link pc">
        {navigation.map((nav, index) => (
          <li key={index} className="header--nav__link--item">
            <Link href={nav.url}>{nav.name}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default HeaderNav;
