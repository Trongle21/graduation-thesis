import React from "react";
import useAppContext from "@/app/_hooks/useAppContext";
import data from "@/app/data.json";
import Link from "next/link";
import { AiFillCloseCircle } from "react-icons/ai";

const HeaderNavMb = () => {
  const { isShowNavBar, onShowNavBar } = useAppContext();
  const navigation = data["navigation"];

  return (
    <nav className={`header--nav-mb ${isShowNavBar ? "show--nav__bar" : ""}`}>
      <div className="nav--mb_close" onClick={onShowNavBar}>
        <AiFillCloseCircle />
      </div>
      <ul className="header--nav-mb__link mobile">
        {navigation.map((nav, index) => (
          <li className="header--nav-mb__link--item" key={index}>
            <Link href={nav.url}>{nav.name}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default HeaderNavMb;
