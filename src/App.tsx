import React from "react";
import "./App.scss";
import MainPage from "./pages/MainPage";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./pages/ErrorPage";
import FilmPage from "./pages/FilmsPage";
import Filters from "./components/Filters";
import FilmsList from "./components/FilmsList";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainPage />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: (
          <div style={{ display: "flex" }}>
            <Filters />
            <FilmsList />
          </div>
        ),
      },
      {
        path: "/film/:filmID",
        element: <FilmPage />,
      },
    ],
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
