import { useState, useEffect } from "react";
import PokeCard from "./components/PokeCard";
import PokeTypes from "./components/PokeTypes";
import PokeCardDetails from "./components/PokeCardDetails";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import PokeTopBar from "./components/PokeTopBar";
import Home from "./pages/Home";
import Details from "./pages/Details";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/details",
    element: <Details />,
  },
]);

function App() {
  const [list, setList] = useState<any>(null);
  useEffect(() => {
    const url = "https://pokeapi.co/api/v2/type/";
    const fetchType = async () => {
      const response = await fetch(url);
      const data = await response.json();
      console.log(data, "data");
      setList(data.results);
    };
    fetchType();
  }, []);

  return (
    <>
      <PokeTopBar />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
