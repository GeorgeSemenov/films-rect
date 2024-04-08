import { createSlice } from "@reduxjs/toolkit";
import { filtersInitialValues } from "./values";
import { filtersYearsType, sortingValuesType } from "./types";
import { IGenre } from "../../API/genres/types";

export const filters = createSlice({
  name: "filters",
  initialState: filtersInitialValues,
  reducers: {
    setSorting: (
      state,
      { payload: sortingType }: { payload: sortingValuesType }
    ) => {
      state.checkedSortingType = sortingType;
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
    setTotalPaginationPages: (
      state,
      { payload: paginationTotalPages }: { payload: number }
    ) => {
      state.paginationTotalPages = paginationTotalPages
        ? paginationTotalPages
        : state.paginationTotalPages; // чтобы paginationTotalPages точно был не undefined
    },
    setSearchQuery: (state, { payload: query }: { payload: string }) => {
      state.searchQuery = query;
    },
    resetFilters: (state) => {
      state = filtersInitialValues;
      //Приделать подтягивание колличества страничек paginationTotalPages
    },
  },
});

export const { actions, reducer } = filters;
