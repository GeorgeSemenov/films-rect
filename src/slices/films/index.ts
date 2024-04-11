import { createSlice } from "@reduxjs/toolkit";
import { IFilm } from "../../API/films/types";

const initialState: IFilm[] = [];

export const filmsSlice = createSlice({
  name: "films",
  initialState,
  reducers: {
    setFilms: (state, { payload: films }: { payload: IFilm[] }) => {
      return films;
    },
  },
});
