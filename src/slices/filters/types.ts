import { IGenre } from "../../API/genres/types";

export interface IFilters {
  years: filtersYearsType;
  minMaxYears: [number, number];
  sortingTypes: ISortingTypes[];
  checkedSortingType: sortingValuesType;
  genres: IGenre[];
  checkedGenres: IGenre[];
  paginationPage: number;
  searchQuery?: string;
}

interface ISortingTypes {
  value: sortingValuesType;
  label: sortingLabelsType;
  selected: boolean;
}

export type filtersYearsType = [number, number];

export type sortingValuesType = "byPopularity" | "byRating";
type sortingLabelsType = "По популярности" | "По рэйтингу";
