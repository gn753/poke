import { atom } from "recoil";

export const pokeListState = atom<any>({
  key: "pokeListState",
  default: [],
});
