import { createSlice } from "@reduxjs/toolkit";
import { FilmsDataType } from "./types";
import { IFetchedFilmsResponse } from "../../API/films/types";

const initialState: FilmsDataType = { films: [], totalPages: 1 };

export const filmsSlice = createSlice({
  name: "filmsData",
  initialState,
  reducers: {
    setFilmsData: (
      state,
      { payload }: { payload: FilmsDataType | IFetchedFilmsResponse }
    ) => {
      if ("films" in payload) {
        const { films, totalPages } = payload as FilmsDataType;
        return { films, totalPages };
      } else {
        const { results: films, total_pages: totalPages } =
          payload as IFetchedFilmsResponse;
        return { films, totalPages };
      }
    },
  },
});

export const { actions, reducer } = filmsSlice;
