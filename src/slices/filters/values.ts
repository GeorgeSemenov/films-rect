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
      name: "аниме",
      slug: "anime",
    },
    {
      name: "биография",
      slug: "biografiya",
    },
  ],
  checkedGenres: [],
  years: [1960, 2023],
  minMaxYears: [1950, 2023],
  paginationPage: 1,
  searchQuery: "",
};
