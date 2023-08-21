import React, { FC } from "react";
import { getWeatherIconSrc } from "@root/utils/api/api";

interface IWeatherIcon {
  weather: {
    description: string
    icon: string
    id: number
    main: string
  };
}

const WeatherIcon:FC<IWeatherIcon> = ({ weather }) => {
  const {description,main,icon}=weather
  const iconSRC=getWeatherIconSrc(icon)
  return (
    <div className="flex items-center space-x-4">
      <img className="w-10 h-10 rounded-full" src={iconSRC} alt="weather-icon" />
      <div className="font-medium dark:text-white">
        <div>{main}</div>
        <div className="text-sm text-gray-500 dark:text-gray-400">{description}</div>
      </div>
    </div>
  );
};

export default WeatherIcon;
