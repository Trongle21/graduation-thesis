import React from "react";
import PropTypes from "prop-types";
import { useFormContext } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";

/**
 * @typedef FormControlProps
 *
 * @property {string} htmlFor - Xác định nhãn liên quan.
 * @property {string} content - Nội dung hiển thị.
 * @property {string} name - name.
 * @property {string} type - Kiểu.
 * @property {string} placeholder - Nội dung hiển thị trong placeholder.
 *
 */

/**
 * Button component.
 * @param {FormControlProps} props - Thuộc tính của Form.
 * @returns {JSX.Element} - Form component.
 */

const FormControl = ({
  as,
  label,
  id,
  name,
  type,
  placeholder,
  cols,
  value,
  rows,
  checked,
  onChange,
  defaultChecked,
  disabled,
}) => {
  let Tag = as === "textarea" ? "textarea" : "input";
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="main--account__form-group">
      <label htmlFor={id} className="form-label">
        {label}
      </label>
      <Tag
        name={name}
        type={type}
        value={value}
        id={id}
        placeholder={placeholder}
        {...register(name)}
        cols={cols}
        rows={rows}
        onChange={onChange}
        checked={checked}
        defaultChecked={defaultChecked}
        disabled={disabled}
      />
      <span className="form-message">
        <ErrorMessage errors={errors} name={name} />
      </span>
    </div>
  );
};

FormControl.propTypes = {
  as: PropTypes.string,
  defaultChecked: PropTypes.node,
  id: PropTypes.string,
  cols: PropTypes.string,
  rows: PropTypes.string,
  checked: PropTypes.bool,
  label: PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
};

export default FormControl;
