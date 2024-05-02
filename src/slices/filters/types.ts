import { IGenre } from "../../API/genres/types";

export interface IFilters {
  years: filtersYearsType;
  minMaxYears: [number, number];
  genres: IGenre[];
  checkedGenres: IGenre[];
  paginationPage: number;
  searchQuery?: string;
}

export type filtersYearsType = [number, number];
