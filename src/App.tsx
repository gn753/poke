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

  return (
    <>
      <PokeTopBar />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
