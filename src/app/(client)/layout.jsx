import React from "react";
import Header from "../_components/header/Header";
import Footer from "../_components/footer/Footer";

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};

export default Layout;
