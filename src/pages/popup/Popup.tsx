import withSuspense from "@src/shared/hoc/withSuspense";
import React, { FC, useEffect, useState } from "react";
import WeatherCard from "@src/components/WeatherCard";
import WeatherCardContainer from "@src/components/WeatherCardContainer";
import InputCity from "@src/UI/InputCity";
import { getId } from "@root/utils/tools";
import {
  getStoredCities,
  getStoredOptions,
  LocaleStorageOptions,
  setStoredCities,
  setStoredOptions
} from "@root/utils/storage";
import { TempScale } from "@root/utils/api/api";
import { ReactComponent as Celsium } from "@root/src/assets/img/celsium.svg";
import { ReactComponent as Farenheit } from "@root/src/assets/img/farenheit.svg";



const Popup: FC = () => {

  const [cities, setCities] = useState<string[]>([]);
  const [cityInput, setCityInput] = useState<string>("");
  const [options, setOptions] =
    useState<LocaleStorageOptions| null>(null);


  useEffect(() => {
    getStoredCities().then(cities => setCities(cities));
    getStoredOptions().then((options) => setOptions(options));
  }, []);


  const handleCityBtnClick = () => {
    if (cityInput === "") return;
    const updatedCities = [...cities, cityInput];
    setStoredCities(updatedCities).then(() => {
      setCities(updatedCities);
      setCityInput("");
    });

  };


  const handleCityDeleteBtnClick = (index: number) => {
    cities.splice(index, 1);
    const updatedCities = [...cities];
    setStoredCities(updatedCities).then(() => {
      setCities(updatedCities);
    });
  };

  const handeTempScaleBtnClick = () => {
    const updateOptions:LocaleStorageOptions={
      ...options,
      tempScale:options?.tempScale===TempScale.metric ? TempScale.imperial :TempScale.metric,
      homeCity: options?.homeCity || '',
    }
    setStoredOptions(updateOptions).then(()=>{
      setOptions(updateOptions)
    })
  };

  if (!options) {
    return null;
  }

  return (
    <div className="container flex flex-col h-screen bg-cyan-300/50">
      <h1 className={"text-xl text-center bg-cyan-950"}>Weather app</h1>
      <div className={"flex-row gap-2"}>
        <InputCity cityInput={cityInput} setCityInput={setCityInput} cities={cities}
                   handleCityBtnClick={handleCityBtnClick} setCities={setCities} />

        <button type="button"
                onClick={handeTempScaleBtnClick}
                className="text-blue-700 border border-blue-700 hover:bg-blue-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center mr-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:focus:ring-blue-800 dark:hover:bg-blue-500">
          {options.tempScale == TempScale.metric && <Celsium />}
          {options.tempScale == TempScale.imperial && <Farenheit />}
          <span className="sr-only">Temp Scale</span>
        </button>
      </div>
      <WeatherCardContainer>
        {options.homeCity !='' && <WeatherCard city={options.homeCity} tempScale={options.tempScale}/>}
        {cities.map((city, index) => {
          return (
            <WeatherCard key={getId()} tempScale={options.tempScale} city={city} onDelete={() => handleCityDeleteBtnClick(index)} />
          );
        })}
      </WeatherCardContainer>
      <div className={"h-4"} />
    </div>
  );
};

export default withSuspense(Popup);
