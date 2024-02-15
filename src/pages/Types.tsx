import { Box } from "@mui/material";
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
  const [isLoading, setIsLoading] = useState(false);
  const params = useParams();
  const id = Number(params.urlParams);

  useEffect(() => {
    const fetchPokeTypes = async () => {
      setIsLoading(true);
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

      //type url에서 포켓몬 id값만 url에서 출력해 전달
      const pokemoDetailsUrlIdParams = await data.pokemon.map((it: any) => {
        const urlParts = it.pokemon.url.split("/");
        return urlParts[urlParts.length - 2];
      });
      //각 데이터에 맞게 매칭
      const results = pokemonDetails.map((it, index) => {
        return {
          id: pokemoDetailsUrlIdParams[index],
          name: pokemonSpecies[index].names[2].name,
          image: it.sprites.front_default,
          color: pokemonSpecies[index].color.name,
        };
      });

      setPokes(results);
      setIsLoading(false);
    };
    fetchPokeTypes();
  }, [id]);

  return (
    <main>
      <div>
        <Box sx={{ display: "flex", flexWrap: "wrap" }}>
          {pokes &&
            pokes.map(
              (poke: any) =>
                poke.id < 10000 && (
                  <Box sx={{ width: "20%" }}>
                    <PokeCard
                      key={poke.name}
                      id={poke.id}
                      image={poke.image}
                      name={poke.name}
                    />
                  </Box>
                )
            )}
        </Box>
        <div>{isLoading && "로딩중입니다"}</div>
      </div>
    </main>
  );
}
