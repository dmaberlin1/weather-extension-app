import React, { FC } from "react";
import RadioButton from "@src/UI/RadioButton";
import { getId, idLong } from "@root/utils/tools";

interface IRadioButton {
  countries:string[]
}
const RadioButtons:FC<IRadioButton> = ({countries}) => {
  return (

    <fieldset>
      <>
      <legend className="sr-only">Countries</legend>
      {countries.map((country)=>{
       return( <RadioButton key={getId(idLong.short)} country={country}></RadioButton>)
      })}
      </>
    </fieldset>

);
};

export default RadioButtons;
