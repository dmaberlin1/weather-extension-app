// https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
import { API_KEY, BASE_URL, IMG_URL_PART1, IMG_URL_PART2 } from "@src/constants/constants";
import { LocaleStorageOptions } from "@root/utils/storage";

export interface IWeatherData {
  name:string
  main:{
    feels_like:number
    temp:number
    humidity:number
  }
  sys:{
    sunrise:number
    sunset:number
    country:string
  }
  wind:{
    speed:number
    deg:number
  }
  weather:{
    description:string
    icon:string
    id:number
    main:string
  }[]
  coord:{
    lat:number
    lon:number
  }
}
// export type OpenWeatherTempScale='metric'| 'imperial'
export enum TempScale {
  metric='metric',
  imperial='imperial'
}
export async function fetchOpenWeatherDataByCity(city:string,tempScale:LocaleStorageOptions["tempScale"]):Promise<IWeatherData> {
  const res=await fetch(`${BASE_URL}${city}&units=${tempScale}&appid=${API_KEY}`)

  if (!res.ok){
    throw new Error('City not found')
  }

  const data:IWeatherData=await res.json()

  return data
}

export const  getWeatherIconSrc=(iconCode:IWeatherData["weather"][0]["icon"])=> {
  return  `${IMG_URL_PART1}${iconCode}${IMG_URL_PART2}`
}