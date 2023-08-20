import withSuspense from "@src/shared/hoc/withSuspense";
import React, { FC, useEffect, useState } from "react";
import WeatherCard from "@src/components/WeatherCard";
import WeatherCardContainer from "@src/components/WeatherCardContainer";
import { americanCities } from "@src/constants/constants";
import InputCity from "@src/UI/InputCity";
import { getId } from "@root/utils/tools";
import { getStoredCities, setStoredCities } from "@root/utils/storage";


const Popup:FC = () => {

  const [cities, setCities] = useState<string[]>([]);
  const [cityInput, setCityInput] = useState<string>('');

  const handleCityBtnClick=()=>{
    if(cityInput ==='') return
    const updatedCities=[...cities,cityInput]
    setStoredCities(updatedCities).then(()=>{
      setCities(updatedCities)
      setCityInput('')
    })

  }

  useEffect(() => {
    getStoredCities().then(cities=>setCities(cities))
  }, []);


  const handleCityDeleteBtnClick=(index:number)=>{
    cities.splice(index,1)
    const updatedCities=[...cities]
    setStoredCities(updatedCities).then(()=>{
      setCities(updatedCities)
    })
  }
  return (
    <div className="container flex flex-col h-screen bg-cyan-300/50">
      <h1 className={'text-xl text-center bg-cyan-950'}>Weather app</h1>
      <InputCity cityInput={cityInput} setCityInput={setCityInput} cities={cities}
                 handleCityBtnClick={handleCityBtnClick} setCities={setCities}/>
      <WeatherCardContainer>
        {cities.map((city,index)=>{
          return (
            <WeatherCard key={getId()} city={city} onDelete={()=>handleCityDeleteBtnClick(index)}/>
          )
        })}
      </WeatherCardContainer>
      <div className={'h-4'}/>
    </div>
  );
};

export default withSuspense(Popup);
