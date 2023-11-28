import React from "react";
import "./styles.scss";
import Header from "../Header";
import FiltersProvider from "../../context/filtersContext";
import { Outlet } from "react-router-dom";
import { useCookies } from "react-cookie";
import { cookiesNames } from "../../constants";
import LoginWindow from "../LoginWindow";

export default function FilmsApp() {
  const [cookies] = useCookies([cookiesNames.isAuthorized]);
  return (
    <FiltersProvider>
      <Header />
      {cookies.isAuthorized ? <Outlet /> : <LoginWindow />}
    </FiltersProvider>
  );
}
