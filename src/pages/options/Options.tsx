import React, { useEffect, useState } from "react";
import { getStoredOptions, LocaleStorageOptions } from "@root/utils/storage";

interface IFormData{
  homeCity:string
  nickname:string
}

const Options: React.FC = () => {
  const [options, setOptions] =
    useState<LocaleStorageOptions | null>(null);
  const formData:IFormData={homeCity:'',nickname:''}
  const [responseBodyForm, setResponseBodyForm] = useState(formData);

  useEffect(() => {
    getStoredOptions().then((options)=>setOptions(options))
  }, []);

  if(!options){
    return null
  }

  const inputChangeHandler=(event:React.ChangeEvent<HTMLInputElement>)=>{
    const{name,value}=event.target
    setResponseBodyForm({...responseBodyForm,[name]:value})

  }

  const handleSubmitOptions=(event:React.FormEvent<HTMLFormElement>)=>{
    event.preventDefault();
    //Form submission happens here
  }

  return (
    <div className="container text-lime-400 bg-lime-50">
      <h1 className="text-5xl font-extrabold dark:text-white">Weather extension<small
        className="ml-2 font-semibold text-gray-500 dark:text-gray-400">options page</small>
      </h1>
      <form>
      <div className="relative z-0 w-full mb-6 group">
        <input type="text"
               onChange={(e)=>inputChangeHandler(e)}
               name="homeCity" id="homeCity"
               className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
               placeholder=" " required />
        <label htmlFor="home_city"
               className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
          Enter a home city
        </label>
      </div>
      <label htmlFor="nickname"
             className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
      <div className="relative z-0 w-full mb-6 group">
  <span
    className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
    <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
         fill="currentColor" viewBox="0 0 20 20">
      <path
        d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
    </svg>
  </span>
        <input type="text"

               name="nickname"
               id="nickname"
               className="rounded-none rounded-r-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
               placeholder="nickname"/>
      </div>
        <button type="submit"
                className="text-gray-900 bg-gradient-to-r from-teal-200 to-lime-200 hover:bg-gradient-to-l hover:from-teal-200 hover:to-lime-200 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-teal-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Teal
          save
        </button>
          </form>
    </div>
  )
};

export default Options;
