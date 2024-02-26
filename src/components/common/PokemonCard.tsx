import { styled, Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import colors from "../../data/colors";
import { IfPokemonCardItem } from "../../types";
import ucFirst from "../../utils/ucFirst";

export default function PokemonCard({
  name,
  image,
  id,
  color,
  types,
}: IfPokemonCardItem) {
  return (
    <ViteItem
      sx={{
        "&:hover": {
          background: color,
        },
        boxShadow: "0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)",
      }}
    >
      <Link to={`/details/${id}`}>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography component="p">{name}</Typography>
          <Typography component="p">
            No. {String(id).padStart(4, "0")}
          </Typography>
        </Box>
        <Box sx={{ textAlign: "center", height: "100px" }} component="figure">
          <Image
            src={image}
            width="100px"
            height="100px"
            alt=""
            loading="lazy"
          />
        </Box>
        <Box
          sx={{
            background: colors[`${types[0].type.name}`],
            display: "inline",
            padding: "4px",
            height: "auto",
            color: "#fff",
            borderRadius: "5px",
          }}
        >
          {ucFirst(types[0].type.name)}
        </Box>
        {types[1] && (
          <Box
            sx={{
              background: colors[`${types[1].type.name}`],
              display: "inline",
              marginLeft: "3px",
              padding: "4px",
              height: "auto",
              color: "#fff",
              borderRadius: "5px",
            }}
          >
            {ucFirst(types[1].type.name)}
          </Box>
        )}
      </Link>
    </ViteItem>
  );
}
const ViteItem = styled(Box)`
  /* 박스 스타일 */
  box-sizing: border-box;
  padding: 1.25rem;
  width: 100%;
  height: 100%;
  /* 테두리 스타일 */
  border: 1px solid #e8e8e8;
  transition: border 0.5s ease-in-out;
  border-radius: 10px;

  /* 커서 스타일 */
  cursor: pointer;
`;
const Image = styled("img")({
  display: "block",
  height: "100px",
});
