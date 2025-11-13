import React from "react";

export default function RoundedBtn({ name, fn, colors,altColor  }) {
  return (
    <button
      onClick={fn}
      className={`py-[18px] px-9 w-fit rounded-full  font-open_sans font-bold duration-300 ${colors ? `bg-secondary hover:bg-accent text-background`: altColor}`}
    >
      {name}
    </button>
  );
}
