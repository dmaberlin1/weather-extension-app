import reloadOnUpdate from "virtual:reload-on-update-in-background-script";
import {setStoredValues} from "@root/utils/storage";
import { ukrainianCities } from "@src/constants/constants";

reloadOnUpdate("pages/background");

/**
 * Extension reloading is necessary because the browser automatically caches the css.
 * If you do not use the css of the content script, please delete it.
 */
reloadOnUpdate("pages/content/style.scss");

console.log("background loaded");

chrome.runtime.onInstalled.addListener(async()=>{
  try {
  await  setStoredValues( {cities:ukrainianCities,country:'UA',user: 'dmaberlin'})
    console.log("Data stored successfully");
  }catch (err) {
console.error('An error occurred while storing data:',err)
  }

})
