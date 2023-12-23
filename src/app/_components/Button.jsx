import React from "react";
import PropTypes from "prop-types";

/**
 * @typedef ButtonProps
 *
 * @property {string} className - Lớp CSS cho button.
 * @property {string} content - Nội dung hiển thị trên button.
 *
 */

/**
 * Button component.
 * @param {ButtonProps} props - Thuộc tính của Button.
 * @returns {JSX.Element} - Button component.
 */

const Button = ({ className, content, type, id,color, name, value, onClick }) => {
  return (
    <button
      className={className}
      type={type}
      id={id}
      color="color"
      name={name}
      value={value}
      onClick={onClick}
    >
      {content}
    </button>
  );
};

Button.propTypes = {
  className: PropTypes.string,
  content: PropTypes.string,
  type: PropTypes.string,
  id: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  onClick: PropTypes.func,
};

export default Button;
