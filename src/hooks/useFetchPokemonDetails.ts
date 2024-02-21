import { useEffect, useState } from "react";
import fetchPokemonDetails from "../api/fetchPokemonDetails";

interface IfDetails {
  name: string;
  text: string;
  color: string;
  types: {
    type: {
      name: string;
    };
  }[];
  image: string;
  height: string;
  weight: string;
  abilities: string;
  genderRatio: number;
  classification: string;
  stats: any;
}
export default function useFetchPokemonDetails(id: number) {
  // 포켓몬 상세 데이터 : 종,타입,이미지, 칼라
  const [pokeDetails, setPokeDetails] = useState<IfDetails | null>(null);

  useEffect(() => {
    //만약 데이터값에 상태가 없다면 호출
    const getPokemonDetails = async () => {
      //id 값으로 포켓몬 상세 데이터 출력
      const pokemonData = await fetchPokemonDetails(id);

      const pokeSpeciesUrl = pokemonData.species.url;
      //상세 데이터에서 나온 종 url로 이미지,한글 이름 찾기
      const speciesRes = await fetch(pokeSpeciesUrl);
      const speciesData = await speciesRes.json();

      const name = speciesData.names[2].name;
      const text = speciesData.flavor_text_entries[23].flavor_text;
      const color = speciesData.color.name;
      const types = pokemonData.types;
      const height = pokemonData.height;
      const weight = pokemonData.weight;
      const abilities = pokemonData.abilities.map(
        (ability: any) => ability.ability.name
      );
      const genderRatio = speciesData.gender_rate;
      const classification = speciesData.genera.find(
        (genus: any) => genus.language.name === "ko"
      ).genus;
      const stats = pokemonData.stats;
      const pokeDetailsData = {
        name,
        text,
        color,
        types,
        height,
        weight,
        abilities,
        genderRatio,
        classification,
        stats,
        image: pokemonData.sprites.other["dream_world"].front_default,
      };

      setPokeDetails(pokeDetailsData);
    };
    if (id) {
      getPokemonDetails();
    }
  }, [id]);
  return pokeDetails;
}
