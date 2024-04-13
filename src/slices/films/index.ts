import { createSlice } from "@reduxjs/toolkit";
import { IFilm } from "../../API/films/types";
import { FilmsDataType } from "./types";

const initialState: FilmsDataType = { films: [], totalPages: 1 };

export const filmsSlice = createSlice({
  name: "films",
  initialState,
  reducers: {
    setFilmsData: (
      state,
      { payload: { films, totalPages } }: { payload: FilmsDataType }
    ) => ({ films, totalPages }),
  },
});

export const { actions, reducer } = filmsSlice;
