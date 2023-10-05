import { RouterProvider, createBrowserRouter } from "react-router-dom";
import PokeTopBar from "./components/PokeTopBar";
import Home from "./pages/Home";
import Details from "./pages/Details";
import Types from "./pages/Types";
import { RecoilRoot } from "recoil";
import Layout from "./components/Layout";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Layout>
        <Home />
      </Layout>
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
  {
    path: "/types/:urlParams",
    element: (
      <>
        <Layout>
          <Types />
        </Layout>
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
