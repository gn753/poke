import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

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
  urlParmas: string;
}

export default function PokeTypes() {
  const [types, setTypes] = useState<IsPokeType[] | []>([]);

  useEffect(() => {
    const fetchPokeType = async () => {
      const url = "https://pokeapi.co/api/v2/type/";
      const response = await fetch(url);
      const data = await response.json();
      const results = await data.results.map((it: any) => {
        const urlParts = it.url.split("/");
        return {
          name: it.name,
          urlParmas: urlParts[urlParts.length - 2],
        };
      });

      setTypes(results);
    };
    fetchPokeType();
  }, []);

  return (
    <div>
      <Box sx={{ width: "768px", margin: "20px auto" }}>
        <Box sx={{ display: "flex", gap: "5px", flexWrap: "wrap" }}>
          {types.length > 0 &&
            types.map(
              (type) =>
                colors[type.name] && (
                  <Link key={type.name} to={`/types/${type.urlParmas}`}>
                    <Box
                      sx={{
                        width: "100px",
                        textAlign: "center",
                        cursor: "pointer",
                        color: "#fff",
                        backgroundColor: `${colors[type.name]}`,
                      }}
                    >
                      {type.name}
                    </Box>
                  </Link>
                )
            )}
        </Box>
      </Box>
    </div>
  );
}
