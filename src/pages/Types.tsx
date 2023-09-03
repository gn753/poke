import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PokeCard from "../components/PokeCard";

interface IsType {
  name: string;
  image: string;
  color: string;
}

export default function Types() {
  const [pokes, setPokes] = useState<IsType[] | null>(null);
  const params = useParams();
  const id = Number(params.urlParams);

  useEffect(() => {
    const fetchPokeTypes = async () => {
      const url = `https://pokeapi.co/api/v2/type/${id}`;
      const response = await fetch(url);
      const data = await response.json();
      //포켓몬 상세 url
      const pokemonDetailsUrls = await data.pokemon.map((it: any) =>
        fetch(it.pokemon.url)
      );
      // promise.all로 병렬 작업
      // 타입에서 url 뽑아 개별 포켓몬 api 로접근
      const pokemonDetails = await Promise.all(pokemonDetailsUrls).then((res) =>
        Promise.all(res.map((item) => item.json()))
      );

      //포켓몬 종에서 한글이름 출력
      const pokemonSpeciesUrls = pokemonDetails.map((specie) =>
        fetch(specie.species.url)
      );
      const pokemonSpecies = await Promise.all(pokemonSpeciesUrls).then(
        (종들) => Promise.all(종들.map((종) => 종.json()))
      );

      //각 데이터에 맞게 매칭
      const results = pokemonDetails.map((it, index) => {
        return {
          id: index + 1,
          name: pokemonSpecies[index].names[2].name,
          image: it.sprites.front_default,
          color: pokemonSpecies[index].color.name,
        };
      });

      setPokes(results);
    };
    fetchPokeTypes();
  }, [id]);

  return (
    <main className="p-10">
      <div>
        <ul className="display: flex flex-wrap">
          {pokes &&
            pokes.map((poke: any) => (
              <PokeCard
                key={poke.name}
                id={poke.id}
                image={poke.image}
                name={poke.name}
              />
            ))}
        </ul>
      </div>
    </main>
  );
}
