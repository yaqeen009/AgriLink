import React from "react";

export const Input = ({ placeholder, type, name, value, onChange }) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      name={name}
      onChange={onChange}
      value={value}
      className="p-5 border border-primary rounded-xl"
    />
  );
};
