import React, { FC, ReactNode } from "react";

const WeatherCardContainer:FC<{children:ReactNode}> = ({children}) => {
  return (
      <div className={'h-1/3 m-1 rounded-xl'}>{children}</div>
  );
};

export default WeatherCardContainer;
