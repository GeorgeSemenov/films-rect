import { createSlice } from "@reduxjs/toolkit";
import { IFavoriteFilm } from "./types";

const initialState: IFavoriteFilm[] = [];

export const favoriteFilmsSlice = createSlice({
  name: "favoriteFilms",
  initialState,
  reducers: {
    setFavoriteFilms(
      state,
      { payload: favoriteFilms }: { payload: IFavoriteFilm[] }
    ) {
      return favoriteFilms;
    },
    addFavoriteFilm(state, { payload: addedFilm }: { payload: IFavoriteFilm }) {
      state.push(addedFilm);
    },
    removeFavoriteFilm(
      state,
      { payload: removedFavoriteFilm }: { payload: IFavoriteFilm }
    ) {
      return [...state.filter((ff) => ff.id !== removedFavoriteFilm.id)];
    },
  },
});

export const { actions, reducer } = favoriteFilmsSlice;
