import React from "react";

const Field = ({
  name,
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  error = "",
}) => {
  return (
    <>
      <div className="form-group">
        <label htmlFor={name}>{label}</label>
        <input
          value={value}
          type={type}
          className={error ? "form-control is-invalid" : "form-control"}
          name={name}
          id={name}
          placeholder={placeholder}
          onChange={onChange}
        />
        {error && <p className="invalid-feedback d-block">{error}</p>}
      </div>
    </>
  );
};

export default Field;
