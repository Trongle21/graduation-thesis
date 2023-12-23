import React from "react";
import PropTypes from "prop-types";
import Link from "next/link";

/**
 * @typedef PathLinkProps
 *
 * @property {string} content - Trang hiện tại.
 */

/**
 *
 * @param {PathLinkProps} props  - Thuộc tính PathLink.
 * @returns {JSX.Element} - PathLink component.
 */

const PathLink = ({ content }) => {
  return (
    <div className="path--link">
      <Link href="/">Home</Link>
      <i className="fa-solid fa-chevron-right"></i>
      <h6>{content}</h6>
    </div>
  );
};

PathLink.propTypes = {
  content: PropTypes.string,
};

export default PathLink;
