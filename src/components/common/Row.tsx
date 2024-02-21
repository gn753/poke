import { Box } from "@mui/material";
import PokemonCard from "./PokemonCard";
import SkeletonUiList from "../SkeletonUiList";

const Row = ({
  index,
  style,
  isLoading,
  itemWidth,
  itemHeight,
  itemsPerRow,
  pokeList,
}: any) => {
  return (
    <>
      {!isLoading && (
        <Box
          sx={{
            ...style,
            display: "flex",
            gap: "10px",
            height: itemHeight,
            paddingBottom: "20px",
          }}
        >
          {Array.from({ length: itemsPerRow }, (_, i) => (
            <Box
              key={index * itemsPerRow + i}
              sx={{ width: itemWidth, height: "100%" }}
            >
              {pokeList[index * itemsPerRow + i] && (
                <PokemonCard
                  id={pokeList[index * itemsPerRow + i].id}
                  name={pokeList[index * itemsPerRow + i].name}
                  image={pokeList[index * itemsPerRow + i].image}
                  color={pokeList[index * itemsPerRow + i].color}
                  types={pokeList[index * itemsPerRow + i].types}
                />
              )}
            </Box>
          ))}
        </Box>
      )}
      {isLoading && <SkeletonUiList index={index} style={style} />}
    </>
  );
};
export default Row;
