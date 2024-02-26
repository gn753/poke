import { IfPokemonList } from "../types";
import fetchPokemonDetails from "./fetchPokemonDetails";

const fetchkoreanNames = async (data: IfPokemonList) => {
  // url에서 id 값 추출
  const urlParts = data.results.map((part: any) => {
    const urlSplit = part.url.split("/");
    const id = urlSplit[urlSplit.length - 2];
    return id;
  });
  //추출한 id값으로 한글 이름이 있는 species api에  접근
  const urls: any = data?.results.map((_unused: any, index: number) => {
    return fetch(
      `https://pokeapi.co/api/v2/pokemon-species/${urlParts[index]}`
    ).then((res) => res.json());
  });

  const pokemonDatas = data?.results.map((_unused: any, index: number) => {
    return fetchPokemonDetails(urlParts[index]);
  });

  const allPokemonDatas = await Promise.all(pokemonDatas).then((res) => res);

  //대량의 요청은 Promise.all로 병렬 처리
  const responses = await Promise.all(urls).then((res) =>
    res.map((it: any, index: number) => {
      return {
        name: it.names[2].name,
        id: urlParts[index],
        image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${urlParts[index]}.png`,
        color: it.color.name,
        types: allPokemonDatas[index].types,
      };
    })
  );
  return responses;
};

export default fetchkoreanNames;
