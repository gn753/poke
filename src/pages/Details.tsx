import { useParams } from "react-router-dom";
import { Box, styled, Typography } from "@mui/material";
import useFetchPokemonDetails from "../hooks/useFetchPokemonDetails";
import ucFirst from "../utils/ucFirst";
import colors from "../data/colors";

function ChartBar({ title, width }: any) {
  return (
    <Box sx={{ marginBottom: "3px" }}>
      <Typography variant="body2" component="p">
        {title}
      </Typography>
      <Box
        sx={{
          backgroundColor: "#98c1b0",
          width: "100px",
          height: "20px",
          boxSizing: "border-box",
        }}
      >
        <Box
          sx={{
            width: `${width}%`,
            height: "20px",
            background: "red",
          }}
        ></Box>
      </Box>
    </Box>
  );
}

export default function Details() {
  const params = useParams();
  const id = Number(params.id);
  const pokeDetails = useFetchPokemonDetails(id);

  return (
    <Wrapper>
      <Box sx={{ display: "flex", gap: "10px" }}>
        <Typography variant="h5">
          <div>No. {String(id).padStart(4, "0")}</div>
          <div>{pokeDetails && pokeDetails.name}</div>
        </Typography>
        <Box>
          <Box
            sx={{
              background: colors[`${pokeDetails?.types[0].type.name}`],
              display: "inline",
              padding: "10px",
              height: "auto",
              color: "#fff",
              borderRadius: "5px",
            }}
          >
            {ucFirst(pokeDetails && pokeDetails?.types[0].type.name)}
          </Box>
        </Box>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center", padding: "10px" }}>
        <div>
          <ChartBar title="HP" width={pokeDetails?.stats[0].base_stat} />
          <ChartBar title="Attack" width={pokeDetails?.stats[1].base_stat} />
          <ChartBar title="Defense" width={pokeDetails?.stats[2].base_stat} />
          <ChartBar
            title="Special-defense"
            width={pokeDetails?.stats[3].base_stat}
          />
          <ChartBar title="Speed" width={pokeDetails?.stats[4].base_stat} />

          <Typography variant="body2">
            {pokeDetails && pokeDetails.text}
          </Typography>
          <PokeDetailsCardWrapper>
            <PokeDetailsCardContainer>
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
        <Box>
          {pokeDetails && (
            <img src={`${pokeDetails.image}`} alt="포켓몬 상세 이미지" />
          )}
        </Box>
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
