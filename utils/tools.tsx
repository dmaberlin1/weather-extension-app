import { uid } from "uid";

export enum idLong {
  short = 16,
  mid = 25,
  long = 32
}

export const getId = (length: idLong = idLong.short) => {
  return uid(length);
};
export const celsius = (fTemp) => {
  const temp = (fTemp - 32) / 1.8;
  return (temp);
};
