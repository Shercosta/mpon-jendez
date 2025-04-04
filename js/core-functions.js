import { items } from "./items.js";

export function GetProductByCode(code) {
  return items.find((item) => item.code === code);
}

export function nominalize(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}
