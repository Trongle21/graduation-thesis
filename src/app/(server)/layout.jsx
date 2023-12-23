import React from "react";
import HeaderServer from "./HeaderServer";
import FooterServer from "./FooterServer";
import { Container } from "react-bootstrap";

const Layout = ({ children }) => {
  return (
    <>
      <HeaderServer />
      {children}
      <FooterServer />
    </>
  );
};

export default Layout;
