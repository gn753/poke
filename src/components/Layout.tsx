import { Box } from "@mui/system";
import Header from "./Header";


export default function Layout({ children }: any) {
  return (
    <>
      <Header />

      <Box sx={{ margin: "50px auto", width: "768px" }}>{children}</Box>
    </>
  );
}
