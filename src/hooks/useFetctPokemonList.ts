import { useAppSelector, useAppDispatch } from "../store/store";
import fetchkoreanNames from "../api/fetchKoreanNames";
import fetchPokemonList from "../api/fetchPokemonList";
import { setPokeList, setIsLoading, setCount } from "../store/pokemonListSlice";

const useFetctPokemonList = () => {
  const pokeList = useAppSelector((state) => state.pokeList.data);
  const isLoading = useAppSelector((state) => state.pokeList.isLoading);
  const count = useAppSelector((state) => state.pokeList.count);
  const dispatch = useAppDispatch();

  const getPokes = async () => {
    dispatch(setIsLoading(true));
    const englishPokes = await fetchPokemonList(count, 100);
    const koreanNames = await fetchkoreanNames(englishPokes);

    dispatch(setPokeList(koreanNames));
    dispatch(setCount(count + 100));
    dispatch(setIsLoading(false));
  };

  return { isLoading, pokeList, count, getPokes };
};

export default useFetctPokemonList;
