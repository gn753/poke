import { useEffect, useState } from "react";

interface IsColors {
  [key: string]: string;
}

const colors: IsColors = {
  normal: "#A8A77A",
  fire: "#EE8130",
  water: "#6390F0",
  electric: "#F7D02C",
  grass: "#7AC74C",
  ice: "#96D9D6",
  fighting: "#C22E28",
  poison: "#A33EA1",
  ground: "#E2BF65",
  flying: "#A98FF3",
  psychic: "#F95587",
  bug: "#A6B91A",
  rock: "#B6A136",
  ghost: "#735797",
  dragon: "#6F35FC",
  dark: "#705746",
  steel: "#B7B7CE",
  fairy: "#D685AD",
};
interface IsPokeType {
  name: string;
  url: string;
}

export default function PokeTypes() {
  const [types, setTypes] = useState<IsPokeType[] | []>([]);

  useEffect(() => {
    const fetchPokeType = async () => {
      const url = "https://pokeapi.co/api/v2/type/";
      const response = await fetch(url);
      const data = await response.json();
      const results = await data.results;
      setTypes(results);
    };
    fetchPokeType();
  }, []);

  return (
    <div>
      <div className="lg:container mx-auto">
        <div className="flex flex-wrap gap-[15px]">
          {types.length > 0 &&
            types.map((type) => (
              <div
                className={`w-[100px] p-4 rounded mt-3 text-center cursor-pointer`}
                style={{ backgroundColor: `${colors[type.name]}` }}
                key={type.name}
              >
                {type.name}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
