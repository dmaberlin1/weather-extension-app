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
import { Messages } from "@root/utils/messages";



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
      user: options?.user || '',
      hasAutoOverlay:options?.hasAutoOverlay as LocaleStorageOptions['hasAutoOverlay']
    }
    setStoredOptions(updateOptions).then(()=>{
      setOptions(updateOptions)
    })
  };

  const handeOverlayBtnClick=()=>{
      chrome.tabs.query(
        {
          active:true
        },
        (tabs)=>{
          if(tabs.length>0 && tabs[0].id !==undefined){
          chrome.tabs.sendMessage(tabs[0].id,Messages.TOGGLE_OVERLAY)
          }
        }
      )
  }

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
        <button type="button"
                onClick={handeOverlayBtnClick}
                className="text-blue-700 border border-blue-700 hover:bg-blue-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center mr-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:focus:ring-blue-800 dark:hover:bg-blue-500">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
               stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round"
                  d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" />
          </svg>

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
