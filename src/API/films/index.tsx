import {
  filmsPopularRelativeUrl,
  filmsTopRatedRelativeUrl,
} from "../../constants";
import { api } from "../api";
import { IFetchedFilms, IFilm } from "./types";

const filmsApi = api.injectEndpoints({
  endpoints: (build) => ({
    getFilmsPopular: build.query<IFetchedFilms, void>({
      query: () => filmsPopularRelativeUrl,
    }),
    getFilmsTopRated: build.query<IFetchedFilms, void>({
      query: () => filmsTopRatedRelativeUrl,
    }),
  }),
});

export const { useGetFilmsPopularQuery, useGetFilmsTopRatedQuery } = filmsApi;
