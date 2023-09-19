import { atom } from "recoil";

export const pokeListState = atom<any>({
  key: "pokeListState",
  default: [],
});
export const pokeListCount = atom<number>({
  key: "pokeListCount",
  default: 0,
});
