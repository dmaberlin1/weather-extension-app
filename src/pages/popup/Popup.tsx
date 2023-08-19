import withSuspense from "@src/shared/hoc/withSuspense";
import React, { FC, useState } from "react";
import WeatherCard from "@src/components/WeatherCard";
import WeatherCardContainer from "@src/components/WeatherCardContainer";

export const americanCities = [
  "New York",
  "Los Angeles",
  "Philadelphia",
  "San Diego",
  "Dallas",
];

export const ukrainianCities = [
  "Kyiv",
  "Dnipro",
  "Odesa",
  "Zaporizhzhia",
  "Lviv",
];

const Popup:FC = () => {

  const [cities, setCities] = useState<string[]>(americanCities);


  return (
    <div className="container flex flex-col h-screen bg-cyan-300/50">
      <h1 className={'text-xl text-center bg-cyan-950'}>Weather app</h1>
      <WeatherCardContainer>
        {cities.map((city,index)=>{
          return (
            <WeatherCard key={index} city={city}></WeatherCard>
          )
        })}
      </WeatherCardContainer>
    </div>
  );
};

export default withSuspense(Popup);
