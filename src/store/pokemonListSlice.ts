// pokeListSlice.js
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IfPokemonCardItem } from "../types";
interface RootState {
  data: IfPokemonCardItem[];
  isLoading: boolean;
  count: number;
}

const initialState: RootState = {
  data: [],
  isLoading: false,
  count: 1,
};

const pokemonListSlice = createSlice({
  name: "pokeList",
  initialState,
  reducers: {
    setPokeList: (state, action: PayloadAction<IfPokemonCardItem[]>) => {
      state.data.push(...action.payload);
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setCount: (state, action) => {
      state.count = action.payload;
    },
  },
});

export const { setPokeList, setIsLoading, setCount } = pokemonListSlice.actions;

export default pokemonListSlice;
