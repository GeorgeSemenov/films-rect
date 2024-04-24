import {
  filmsPopularRelativeUrl,
  filmsTopRatedRelativeUrl,
  searchFilmsQueryUrl,
  urlBase,
} from "../../constants";
import { IFilters, sortingValuesType } from "../../slices/filters/types";
import { api } from "../api";
import { IUser } from "../user/types";
import { IFetchedFilmResponse, IFetchedFilmsResponse } from "./types";

const filmsApi = api.injectEndpoints({
  endpoints: (build) => ({
    getFilms: build.query<IFetchedFilmsResponse, IFilters>({
      providesTags: ["films"],
      query: (filters: IFilters) => {
        const { paginationPage: page } = filters;
        const pageQuery = page === 0 || !page ? "" : `&page=${page}`;

        if (filters.searchQuery) {
          return `${searchFilmsQueryUrl}${filters.searchQuery}${pageQuery}`;
        }

        const sortedByPopularity: sortingValuesType = "byPopularity";
        if (filters?.checkedSortingType === sortedByPopularity) {
          return filmsPopularRelativeUrl + pageQuery;
        } else {
          return filmsTopRatedRelativeUrl + pageQuery;
        }
      },
    }),

    // getFilm: build.query<IFetchedFilmResponse,void>({
    //   providesTags:['film'],
    //   queryFn: async ()=>{
    //     const kek = await fetch(`loh/pidr`)
    //     return kek;
    //   },
    // }),
    getFavoriteFilms: build.query<
      IFetchedFilmsResponse,
      { user: IUser; page: number }
    >({
      providesTags: ["favFilms"],
      query: ({ user, page }) =>
        `${urlBase}/3/account/${user.id}/favorite/movies?page=${page}`,
    }),
  }),
});

export const { useGetFilmsQuery, useGetFavoriteFilmsQuery } = filmsApi;
