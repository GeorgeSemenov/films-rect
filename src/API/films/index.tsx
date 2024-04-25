import {
  IFavoriteFilm,
  filmsPopularRelativeUrl,
  filmsTopRatedRelativeUrl,
  searchFilmsQueryUrl,
  urlBase,
} from "../../constants";
import { IFilters, sortingValuesType } from "../../slices/filters/types";
import { api } from "../api";
import fetchData from "../fetchData";
import fetchAllFavoriteFilms from "../fetchFavoriteFilms";
import { IUser } from "../user/types";
import { IFetchedFilmResponse, IFetchedFilmsResponse } from "./types";

const filmsApi = api.injectEndpoints({
  endpoints: (build) => ({
    getFilm: build.query<IFetchedFilmResponse, number>({
      providesTags: ["films"],
      queryFn: async (id) => {
        const creditsURL =
          urlBase + "/3/movie/" + id + "/credits?language=ru-RU";
        const detailsURL = urlBase + "/3/movie/" + id + "?language=ru-RU";
        const credits = await fetchData({ url: creditsURL });
        const details = await fetchData({ url: detailsURL });
        return { data: { credits, details } };
      },
    }),
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
    getFavoriteFilms: build.query<
      IFetchedFilmsResponse,
      { user: IUser; page: number }
    >({
      providesTags: ["favFilms"],
      query: ({ user, page }) =>
        `${urlBase}/3/account/${user.id}/favorite/movies?page=${page}`,
    }),
    getAllFavoriteFilms: build.query<IFavoriteFilm[], IUser>({
      providesTags: ["favFilms"],
      queryFn: async (user) => {
        const favFilms = await fetchAllFavoriteFilms(user);
        return { data: favFilms };
      },
    }),
  }),
});

export const { useGetFilmQuery, useGetFilmsQuery, useGetFavoriteFilmsQuery } =
  filmsApi;
