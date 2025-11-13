import React from "react";

export const FeatureCard = ({title, info, icon}) => {
  return (
    <div className="flex flex-col text-primary p-12 space-y-4 border border-primary rounded-xl hover:shadow-2xl duration-500">
      <span className="flex items-center space-x-0.5">
        <span className="w-9 p-2 border border-secondary rounded-md  hover:bg-secondary">
          <img src={icon} alt="" />
        </span>
        <p className="text-body font-open_sans font-bold">{title}</p>
      </span>
      <p className="text-body font-open_sans font-light">
       {info}
      </p>
    </div>
  );
};
