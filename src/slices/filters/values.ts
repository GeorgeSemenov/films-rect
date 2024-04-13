import { IFilters } from "./types";

export const filtersInitialValues: IFilters = {
  sortingTypes: [
    {
      value: "byPopularity",
      label: "По популярности",
      selected: true,
    },
    {
      value: "byRating",
      label: "По рэйтингу",
      selected: false,
    },
  ],
  checkedSortingType: "byPopularity",
  genres: [
    {
      id: 28,
      name: "боевик",
    },
    {
      id: 12,
      name: "приключения",
    },
    {
      id: 16,
      name: "мультфильм",
    },
    {
      id: 35,
      name: "комедия",
    },
  ],
  checkedGenres: [],
  years: [1960, 2023],
  minMaxYears: [1950, 2023],
  paginationPage: 1,
  searchQuery: "",
};
