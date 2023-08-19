import React, { FC, useEffect, useState } from "react";
import { fetchOpenWeatherDataByCity, IWeatherData } from "@root/utils/api/api";

interface IWeatherCard {
  city:string
}
type WeatherCardState=WeatherState
enum WeatherState {
  loading='loading',
  error='error',
  ready='ready'
}
const WeatherCard:FC<IWeatherCard> = ({city}) => {
  const [weatherData,
    setWeatherData] = useState <IWeatherData | null>(null);
  const [cardState,
    setCardState] = useState<WeatherCardState>(WeatherState.ready);
  useEffect(() => {
    fetchOpenWeatherDataByCity(city)
      .then((data)=> {
        console.log(data);
        // console.log(data.name+data.sys.country);
        setWeatherData(data)
        setCardState(WeatherState.ready)
      })
      // .then((data)=> console.log(celsius(data.main.temp)))
      .catch((err)=> setCardState(WeatherState.error))


  }, [city]);

  if(cardState==WeatherState.loading || cardState== WeatherState.error){
    return (
      <>
      {cardState == WeatherState.loading &&  <h2 className={'px-2 text-xl'}>Loading...</h2>}
      {cardState==WeatherState.error && <h2 className={'px-2 text-lg'}>Error: could not retrieve weather data</h2>}
      </>
    )
  }

  const {name, sys,main,
    weather,}=weatherData as IWeatherData
  return (
    <div className={'bg-cyan-500/40 py-11 flex flex-col px-2 items-center'}>
      <p className={'text-xl'}>{name} {sys.country}🌍</p>
      <p className={'text-xl'}>{main.temp}🌡</p>
      <p className={'text-xl'}>Feels Like {main.feels_like}</p>
    </div>
  );
};

export default WeatherCard;
