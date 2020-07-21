import React from "react";

const Select = ({ name, label, children, value, error = "", onChange }) => {
  return (
    <>
      <div className="form-group">
        <label htmlFor="customer">{label}</label>
        <select
          name={name}
          id={name}
          className={"form-control" + (error && " is-invalid")}
          value={value}
          onChange={onChange}
        >
          {children}
        </select>

        {error && <p className="invalid-feedback d-block">{error}</p>}
      </div>
    </>
  );
};

export default Select;
