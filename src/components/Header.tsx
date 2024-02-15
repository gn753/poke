import { Box, styled, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <Box sx={{ background: "#072ac8", padding: "50px 0px" }}>
      <Box sx={{ width: "768px", margin: "auto", position: "relative" }}>
        <Img src="/img/pokeball.svg" alt="img" width="100px" height="100px" />
        <Box sx={{ display: "flex" }}>
          <Link to="/">
            <Typography variant="h3" color="#fff">
              Who are you loooking for
            </Typography>
          </Link>
        </Box>
      </Box>
    </Box>
  );
}

const Img = styled("img")({
  position: "absolute",
  top: "-30px",
  right: "20px",
});
