import { atom } from "recoil";

const now = new Date();

export const selectedStartState = atom({
  key: "selectedStartState",
  default: now,
});
export const selectedEndState = atom({
  key: "selectedEndState",
  default: now,
});
