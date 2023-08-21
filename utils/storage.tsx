import { TempScale } from "@root/utils/api/api";


export interface LocalStorage {
  cities?:string[]
  options?:LocaleStorageOptions
  country?:string
}
export type LocalStorageKeys=keyof LocalStorage
export interface LocaleStorageOptions {
  hasAutoOverlay:boolean
  homeCity:string
  tempScale:TempScale.metric|TempScale.imperial
  user?:string
}
export const setStoredOptions=(options:LocaleStorageOptions):Promise<void>=>{
  const vals:LocalStorage={
    options,
  }
  return new Promise((resolve)=>{
    chrome.storage.local.set(vals,()=>{
      resolve()
    })
  })
}

export const getStoredOptions=():Promise<LocaleStorageOptions>=>{
  const keys:LocalStorageKeys[]=["options"]
  return new Promise((resolve)=>{
    chrome.storage.local.get(keys,(res:LocalStorage)=>{
      const options:LocaleStorageOptions=res.options || {tempScale:TempScale.metric,homeCity:'',hasAutoOverlay:false}
      resolve(options)
    })
  })
}

export const  setStoredValues=({cities,country,options}:LocalStorage):Promise<void> =>{
  const vals:LocalStorage={
    cities,
    country,
    options

  }
    return new Promise((resolve)=>{
      chrome.storage.local.set(vals,()=>{
        resolve()
      })
    })
}



export const setStoredCities=( cities :LocalStorage['cities'])=>{

  return new Promise<void>((resolve)=>{
    chrome.storage.local.set({ cities },()=>{
      resolve()
    })
  })
}

export const getStoredValues=():Promise<LocalStorage>=>{
  const keys:LocalStorageKeys[]=['cities','country','options']
  return new Promise((resolve)=>{
    chrome.storage.local.get(keys,(res:LocalStorage)=>{
      resolve(res)
    })
  })
}
export const getStoredCities=():Promise<string[]>=>{
  const keys:LocalStorageKeys[]=['cities']
  return new Promise((resolve)=>{
    chrome.storage.local.get(keys,(res:LocalStorage)=>{
      resolve(res.cities ?? [])
    })
  })
}
//
// ?? - это оператор объединения с nullish значениями в JavaScript (и TypeScript).
// Этот оператор используется для предоставления значения по умолчанию,
// если левая сторона выражения null или undefined, но не, если это, например, пустая строка или 0.

