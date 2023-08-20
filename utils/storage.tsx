export interface LocalStorage {
  cities?:string[]
  country?:string
  user?:string
}
export type LocalStorageKeys=keyof LocalStorage
export const  setStoredValues=({cities,country,user}:LocalStorage):Promise<void> =>{
  const vals:LocalStorage={
    cities,
    country,
    user
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
  const keys:LocalStorageKeys[]=['cities','country','user']
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