import { RouterProvider, createBrowserRouter } from "react-router-dom";
import PokeTopBar from "./components/PokeTopBar";
import Home from "./pages/Home";
import Details from "./pages/Details";
import { RecoilRoot } from "recoil";
import PokeTypes from "./components/PokeTypes";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <PokeTopBar />
        <PokeTypes />
        <Home />
      </>
    ),
  },
  {
    path: "/details/:id",
    element: (
      <>
        <PokeTopBar />
        <Details />
      </>
    ),
  },
]);

function App() {
  return (
    <RecoilRoot>
      <RouterProvider router={router} />
    </RecoilRoot>
  );
}

export default App;
