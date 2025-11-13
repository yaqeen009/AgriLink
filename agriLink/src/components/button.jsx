import React from "react";

export const Button = ({ name, fn, btnType }) => {
  return (
    <button
      onClick={fn}
      type={btnType}
      className="bg-primary p-5 rounded-xl text-background text-cta font-open_sans font-bold focus:outline-none focus:ring-4 focus:ring-primary hover:bg-accent"
    >
      {name}
    </button>
  );
};
