import React from "react";
import useAppContext from "@/app/_hooks/useAppContext";
import { FaBars } from "react-icons/fa";

const HeaderBar = () => {
  const { isShowNavBar, onShowNavBar } = useAppContext();

  return (
    <div
      className={`header--bar ${isShowNavBar ? "opacity" : ""}`}
      onClick={onShowNavBar}
    >
      <FaBars />
    </div>
  );
};

export default HeaderBar;
