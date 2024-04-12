import {
  filmsPopularRelativeUrl,
  filmsTopRatedRelativeUrl,
} from "../../constants";
import { IFilters, sortingValuesType } from "../../slices/filters/types";
import { api } from "../api";
import { IFetchedFilmsResponse } from "./types";

const filmsApi = api.injectEndpoints({
  endpoints: (build) => ({
    getFilms: build.query<IFetchedFilmsResponse, IFilters>({
      query: (filters: IFilters) => {
        const { paginationPage: page } = filters;
        const pageQuery = page === 0 || !page ? "" : `?page=${page}`;

        const sortedByPopularity: sortingValuesType = "byPopularity";
        if (filters?.checkedSortingType === sortedByPopularity) {
          return filmsPopularRelativeUrl + pageQuery;
        } else {
          return filmsTopRatedRelativeUrl + pageQuery;
        }
      },
    }),
  }),
});

export const { useGetFilmsQuery } = filmsApi;
