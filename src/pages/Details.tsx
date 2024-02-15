import { useParams } from "react-router-dom";
import { Box, styled, Typography } from "@mui/material";
import useFetchPokemonDetails from "../hooks/useFetchPokemonDetails";

export default function Details() {
  const params = useParams();
  const id = Number(params.id);
  const pokeDetails = useFetchPokemonDetails(id);
  return (
    <Wrapper>
      <Box sx={{ display: "flex", justifyContent: "center", padding: "10px" }}>
        <Box sx={{ background: `${pokeDetails && pokeDetails.color}` }}>
          {pokeDetails && (
            <img src={`${pokeDetails.image}`} alt="포켓몬 상세 이미지" />
          )}
        </Box>
        <div>
          <Typography variant="h3">
            <div>No. {String(id).padStart(4, "0")}</div>
            <div>{pokeDetails && pokeDetails.name}</div>
          </Typography>
          <Typography variant="body2">
            {pokeDetails && pokeDetails.text}
          </Typography>
          <PokeDetailsCardWrapper>
            <PokeDetailsCardContainer>
              <PokeDetailsCardInfo>
                타입 : {pokeDetails && pokeDetails.type}
              </PokeDetailsCardInfo>
              <PokeDetailsCardInfo>
                키 : {pokeDetails && pokeDetails.height}m
              </PokeDetailsCardInfo>
              <PokeDetailsCardInfo>
                분류 : {pokeDetails && pokeDetails.classification}
              </PokeDetailsCardInfo>
              <PokeDetailsCardInfo>
                성별 :
                {pokeDetails && pokeDetails.genderRatio === 1 ? "남" : "여"}
              </PokeDetailsCardInfo>
              <PokeDetailsCardInfo>
                몸무게 : {pokeDetails && pokeDetails.weight}kg
              </PokeDetailsCardInfo>
              <PokeDetailsCardInfo>
                특성 : {pokeDetails && pokeDetails.abilities}
              </PokeDetailsCardInfo>
            </PokeDetailsCardContainer>
          </PokeDetailsCardWrapper>
        </div>
      </Box>
    </Wrapper>
  );
}

const Wrapper = styled(Box)({
  width: "768px",
  margin: "auto",
});

const PokeDetailsCardWrapper = styled(Box)`
  /* 테두리 스타일 */
  border: 1px solid #e8e8e8;
  border-radius: 7px;
  padding: 0.5rem 1.25rem;
`;
const PokeDetailsCardContainer = styled(Box)({
  display: "flex",
  flexWrap: "wrap",
});
const PokeDetailsCardInfo = styled(Typography)({
  display: "block",
  padding: "3px",
  width: "33.3333%%",
});
