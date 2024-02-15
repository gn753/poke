import { styled, Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";

interface IsPokeCard {
  name: string;
  image: string;
  id: number;
}

export default function PokeCard({ name, image, id }: IsPokeCard) {
  return (
    <ViteItem>
      <Link to={`/details/${id}`}>
        <Box sx={{ textAlign: "center" }} component="figure">
          <Image src={image} alt="" loading="lazy" />
        </Box>
        <Typography component="p">No. {String(id).padStart(4, "0")}</Typography>
        <Typography component="p">{name}</Typography>
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
  display: "inline-block",
  maxWidth: "100%",
});
