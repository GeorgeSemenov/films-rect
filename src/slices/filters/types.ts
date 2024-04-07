import { IGenre } from "../../API/genres/types";

export interface IFilters {
  years: filtersYearsType;
  minMaxYears: [number, number];
  filtersSortingTypes: IfiltersSortingTypes[];
  checkedSortingType: sortingValuesType;
  genres: IGenre[];
  checkedGenres: IGenre[];
  paginationTotalPages: number;
  paginationPage: number;
  searchQuery?: string;
}

interface IfiltersSortingTypes {
  value: sortingValuesType;
  label: sortingLabelsType;
  selected: boolean;
}

export type filtersYearsType = [number, number];

export type sortingValuesType = "byPopularity" | "byRating";
type sortingLabelsType = "По популярности" | "По рэйтингу";
