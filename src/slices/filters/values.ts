import { IFilters } from "./types";

export const filtersInitialValues: IFilters = {
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
