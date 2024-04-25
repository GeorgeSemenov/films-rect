import { useDispatch } from "react-redux";
import { actions as displayedErrorActions } from "../slices/error";
import { actions as filtersActions } from "../slices/filters";
import { actions as filmsActions } from "../slices/films";
import { actions as favFilmsActions } from "../slices/favoriteFilms";
import { actions as userActions } from "../slices/user";
import { useMemo } from "react";
import { bindActionCreators } from "@reduxjs/toolkit";

export default function useActions() {
  const dispatch = useDispatch();

  const rootActions = {
    ...displayedErrorActions,
    ...filtersActions,
    ...filmsActions,
    ...userActions,
    ...favFilmsActions,
  };

  return useMemo(() => bindActionCreators(rootActions, dispatch), [dispatch]);
}
