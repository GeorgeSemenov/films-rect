import {
  filmsPopularRelativeUrl,
  filmsTopRatedRelativeUrl,
  searchFilmsQueryUrl,
  urlBase,
} from "../../constants";
import { IFavoriteFilm } from "../../slices/favoriteFilms/types";
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
    getFilms: build.query<
      IFetchedFilmsResponse,
      { page?: number; limit?: number }
    >({
      providesTags: ["films"],
      query: ({ page = 1, limit = 10 }) => `/movie?page=${page}&limit=${limit}`,
    }),
  }),
});

export const { useGetFilmQuery, useGetFilmsQuery } = filmsApi;
