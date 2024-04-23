import { createSlice } from "@reduxjs/toolkit";
import { IFavoriteFilm } from "./types";

const initialState: IFavoriteFilm[] = [];

export const favoriteFilmsSlice = createSlice({
  name: "favoriteFilms",
  initialState,
  reducers: {
    setFavoriteFilms(
      favFilms,
      { payload: favoriteFilms }: { payload: IFavoriteFilm[] }
    ) {
      return favoriteFilms;
    },
    addFavoriteFilm(
      favFilms,
      { payload: addedFilm }: { payload: IFavoriteFilm }
    ) {
      favFilms.push(addedFilm);
    },
    removeFavoriteFilm(
      favFilms,
      { payload: removedFavoriteFilm }: { payload: IFavoriteFilm }
    ) {
      return [...favFilms.filter((ff) => ff.id !== removedFavoriteFilm.id)];
    },
    toggleFavoriteFilm(
      favFilms,
      { payload: favFilm }: { payload: IFavoriteFilm }
    ) {
      if (favFilms.some((films) => films.id === favFilm.id)) {
        return [...favFilms.filter((ff) => ff.id !== favFilm.id)];
      } else {
        return [...favFilms, favFilm];
      }
    },
  },
});

export const { actions, reducer } = favoriteFilmsSlice;
