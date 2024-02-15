import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Details from "./pages/Details";
import Types from "./pages/Types";

import Layout from "./components/Layout";
import { Provider } from "react-redux";
import store from "./store/store";

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
        <Layout>
          <Details />
        </Layout>
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
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}

export default App;
