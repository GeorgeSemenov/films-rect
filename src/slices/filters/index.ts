import { createSlice } from "@reduxjs/toolkit";
import { filtersInitialValues } from "./values";
import { IFilters, filtersYearsType } from "./types";
import { IGenre } from "../../API/genres/types";

export const filters = createSlice({
  name: "filters",
  initialState: filtersInitialValues,
  reducers: {
    resetFilters: (state: IFilters) => {
      state.checkedGenres = filtersInitialValues.checkedGenres;
      state.paginationPage = filtersInitialValues.paginationPage;
      state.searchQuery = filtersInitialValues.searchQuery;
      state.years = filtersInitialValues.years;
    },
    setYears: (state, { payload: years }: { payload: filtersYearsType }) => {
      state.years = years;
    },
    setCheckedGenres: (
      state,
      { payload: checkedGenres }: { payload: IGenre[] }
    ) => {
      state.checkedGenres = checkedGenres;
    },
    setGenres: (state, { payload: genres }: { payload: IGenre[] }) => {
      state.genres = genres;
    },
    setPaginationPage: (
      state,
      { payload: paginationPage }: { payload: number }
    ) => {
      state.paginationPage = paginationPage;
    },
    setSearchQuery: (state, { payload: query }: { payload: string }) => {
      state.searchQuery = query;
    },
  },
});

export const { actions, reducer } = filters;
