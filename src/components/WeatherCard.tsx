import React, { FC, useEffect, useState } from "react";
import { fetchOpenWeatherDataByCity, getWeatherIconSrc, IWeatherData, TempScale } from "@root/utils/api/api";
import Loading from "@src/UI/Loding";
import Error from "@src/UI/Error";
import { LocaleStorageOptions } from "@root/utils/storage";
import { cn } from "@root/utils/tools";
import WeatherIcon from "@src/components/WeatherIcon";


interface IWeatherCard {
  city:string
  tempScale:LocaleStorageOptions["tempScale"]
  onDelete?:()=>void
  CardIsOverlay?:boolean
}
type WeatherCardState=WeatherState
enum WeatherState {
  loading='loading',
  error='error',
  ready='ready'
}

const WeatherCard:FC<IWeatherCard> = ({city,onDelete,
                                        tempScale,CardIsOverlay=false}) => {
  const [weatherData, setWeatherData] =
    useState <IWeatherData | null>(null);
  const [cardState, setCardState] =
    useState<WeatherCardState>(WeatherState.ready);


  useEffect(() => {
    fetchOpenWeatherDataByCity(city,tempScale)
      .then((data)=> {
        console.log(data);
        // console.log(data.name+data.sys.country);
        setWeatherData(data)
        setCardState(WeatherState.ready)
      })
      // .then((data)=> console.log(celsius(data.main.temp)))
      .catch((err)=> setCardState(WeatherState.error))


  }, [city,tempScale]);

  if(cardState==WeatherState.loading || cardState== WeatherState.error){
    return (
      <>
      {cardState == WeatherState.loading && <Loading/>}
      {cardState==WeatherState.error && <Error/>}
      </>
    )
  }

  const {name, sys,main,
    weather}=weatherData as IWeatherData
  const hasWeatherData=weatherData && weatherData.weather.length>0
  return (
    <div className={cn('bg-cyan-500/40 py-11 flex flex-col px-2 items-center',{'py-5 px-1 bg-cyan-500/70':CardIsOverlay})}>
      <p className={cn('text-xl',{'text-lg':CardIsOverlay})}>{name} {sys.country}🌍</p>
      <p className={cn('text-xl',{'text-lg':CardIsOverlay})}>{main.temp}🌡</p>
      <p className={cn('text-xl',{'text-lg':CardIsOverlay})}>Feels Like {main.feels_like}</p>

      {onDelete && <button type="button"
                           onClick={onDelete}
                           className={cn("text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800",
                             {"text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800": CardIsOverlay})}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
             strokeWidth="1.5" stroke="currentColor"
             className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round"
                d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>

        <span className="sr-only">Delete</span>
      </button>
      }
      <>
      {/*{hasWeatherData && <img src={getWeatherIconSrc(weather[0].icon)} alt="weather-icon"/>}*/}
      {hasWeatherData && <WeatherIcon weather={weather[0]}/>}

      </>
    </div>
  );
};

export default WeatherCard;
