import ReactDOM from "react-dom";
import { FC, useEffect, useState } from "react";
import WeatherCard from "@src/components/WeatherCard";
import './contentScript.css'
import { getStoredOptions, LocaleStorageOptions } from "@root/utils/storage";
import { Messages } from "@root/utils/messages";
const App:FC<object>=()=>{
  const [options, setOptions] =
    useState<LocaleStorageOptions|null>(null);
  const [isActive, setIsActive] = useState<boolean>(true);




  useEffect(() => {
    getStoredOptions().then((options)=>setOptions(options))
    setIsActive(options?.hasAutoOverlay || false)
  }, []);

  useEffect(() => {
    chrome.runtime.onMessage.addListener((msg)=>{
      if(msg===Messages.TOGGLE_OVERLAY){
        setIsActive(!isActive)
      }
    })
  }, [isActive]);


  if(!options){
    return null
  }

  const {homeCity,tempScale}=options
  return (
    <>
    {isActive &&
  <div className={"overlayCard"}>
    <WeatherCard city={homeCity} tempScale={tempScale} onDelete={()=>setIsActive(false)} />
  </div>
}
    </>
  )
}



const root=document.createElement('div')
document.body.appendChild(root)
ReactDOM.render(<App/>,root)

















//from template
// console.log("content loaded");
//
// /**
//  * @description
//  * Chrome extensions don't support modules in content scripts.
//  */
// import("./components/Demo");


