// https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
import { BASE_URL ,API_KEY} from "@src/constants/constants";
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
export async function fetchOpenWeatherDataByCity(city:string):Promise<IWeatherData> {
  const res=await fetch(`${BASE_URL}${city}&units=metric&appid=${API_KEY}`)

  if (!res.ok){
    throw new Error('City not found')
  }

  const data:IWeatherData=await res.json()

  return data
}
