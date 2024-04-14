import React from "react";
import "./styles.scss";
import Header from "../Header";
import FiltersProvider from "../../context/filtersContext";
import { Outlet } from "react-router-dom";
import { useCookies } from "react-cookie";
import { cookiesNames } from "../../constants";
import LoginWindow from "../LoginWindow";
import useDisplayedError from "../../hooks/useDisplayedError";
import PopupWindow from "../PopupWindow";

export default function FilmsApp() {
  const displayedError = useDisplayedError();
  const [cookies] = useCookies([cookiesNames.isAuthorized]);

  return (
    <FiltersProvider>
      <Header />
      {cookies.isAuthorized ? <Outlet /> : <LoginWindow />}
      {displayedError.error && (
        <PopupWindow
          message={
            displayedError
              ? displayedError?.error.message
              : `Неизвестная ошибка приложения`
          }
          className="popup-window_theme_error"
          animationDuration={
            displayedError ? displayedError.displayDuration : "3s"
          }
          animationDelay={displayedError ? displayedError.displayDelay : "0s"}
        />
      )}
    </FiltersProvider>
  );
}
