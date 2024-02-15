import { Box } from "@mui/system";
import Header from "./Header";
import PokeTypes from "./PokeTypes";

export default function Layout({ children }: any) {
  return (
    <>
      <Header />
      <PokeTypes />
      <Box sx={{ margin: "50px auto", width: "768px" }}>{children}</Box>
    </>
  );
}
