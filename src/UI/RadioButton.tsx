import React, { FC } from "react";

interface IRadioButton {
  country: string;
  checked?:boolean
}

const RadioButton:FC<IRadioButton> = ({country,checked=false}) => {
  return (
    <div className="flex items-center mb-4">
      <input id="country-option-1" type="radio" name="countries" value={country}
             className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 dark:focus:bg-blue-600 dark:bg-gray-700 dark:border-gray-600"
             checked={checked}/>
      <label htmlFor="country-option-1" className="block ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
        {country}
      </label>
    </div>
  );
};

export default RadioButton;
