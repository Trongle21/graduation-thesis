import React from "react";
import PropTypes from "prop-types";

/**
 * @typedef HeroSectionProps
 *
 * @property {string} backgroundImg -   Tên class của section--hero.
 * @property {string} content   -   Nội dung của section--hero.
 * @property {string} des   -   Mô tả của section--hero.
 *
 */

/**
 *
 * @param {HeroSectionProps} props  -   Thuộc tính của HeroSection.
 * @returns {JSX.Element}   -   HeroSection component.
 */

const HeroSection = ({ backgroundImg, content, des }) => {
  return (
    <section className="section--hero">
      <div
        className="section--hero__image"
        style={{ backgroundImage: `url(${backgroundImg})` }}
      >
        <div className="section--hero__wrapper">
          <div className="content--hero__name">{content}</div>
          <div className="content--hero__des">{des}</div>
        </div>
      </div>
    </section>
  );
};

HeroSection.propTypes = {
  backgroundImg: PropTypes.string,
  content: PropTypes.string,
  des: PropTypes.string,
};

export default HeroSection;
