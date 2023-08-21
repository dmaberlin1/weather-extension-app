import reloadOnUpdate from "virtual:reload-on-update-in-background-script";
import { getStoredCities, getStoredOptions, setStoredCities, setStoredValues } from "@root/utils/storage";
import { ukrainianCities } from "@src/constants/constants";
import { fetchOpenWeatherDataByCity, TempScale } from "@root/utils/api/api";
import options from "@pages/options/Options";

reloadOnUpdate("pages/background");

/**
 * Extension reloading is necessary because the browser automatically caches the css.
 * If you do not use the css of the content script, please delete it.
 */
reloadOnUpdate("pages/content/style.scss");

console.log("background loaded");

chrome.runtime.onInstalled.addListener(async()=>{
  try {
  await  setStoredValues( {
    cities:ukrainianCities,
    country:'UA',
    options:{
      hasAutoOverlay:false,
      tempScale:TempScale.metric,
      homeCity:'',
      user: '',
    }
  })
    console.log("Data stored successfully");
  }catch (err) {
console.error('An error occurred while storing data:',err)
  }
})

chrome.contextMenus.create({
  contexts:['selection'],
  title:'Add city to weather extension',
  id:'weatherExtension'
})

chrome.alarms.create({
  periodInMinutes:5
})

chrome.contextMenus.onClicked.addListener((event)=>{
  getStoredCities().then((cities)=>{
    setStoredCities([...cities,event.selectionText as string])
  })
})

chrome.alarms.onAlarm.addListener(()=>{
  getStoredOptions().then((options)=>{
    if(options.homeCity===''){
      return
    }
    fetchOpenWeatherDataByCity(options.homeCity,options.tempScale).then((data)=>{
      const temp=Math.round(data.main.temp)
      const symbol=options.tempScale===TempScale.metric ? '\u2103' :'\u2109'
      chrome.action.setBadgeText({
        text:`${temp}${symbol}`
      })

    })
  })
})



