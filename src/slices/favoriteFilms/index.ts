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
  },
});

export const { actions, reducer } = favoriteFilmsSlice;
