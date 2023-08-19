import React, { FC } from "react";
import { getId } from "@root/utils/tools";

interface ISelect {
  cities:string[]
}
const Select:FC<ISelect> = ({cities}) => {
  return (
    <>
    <label htmlFor="cities" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
      Select a city
    </label>
  <select id="cities"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
    <>
    {cities.map((city)=>(
      <option key={getId()}>{city}</option>
    ))}
    </>
    <option>Canada</option>
    <option>France</option>
    <option>Germany</option>
  </select>
    </>
);
};

export default Select;