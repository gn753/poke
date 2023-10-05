import PokeTopBar from "./PokeTopBar";
import PokeTypes from "./PokeTypes";

export default function Layout({ children }: any) {
  return (
    <>
      <PokeTopBar />
      <PokeTypes />
      {children}
    </>
  );
}
