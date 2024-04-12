import {
  filmsPopularRelativeUrl,
  filmsTopRatedRelativeUrl,
} from "../../constants";
import { api } from "../api";
import { IFetchedFilmsResponse } from "./types";

const filmsApi = api.injectEndpoints({
  endpoints: (build) => ({
    getFilmsPopular: build.query<IFetchedFilmsResponse, void>({
      query: () => filmsPopularRelativeUrl,
    }),
    getFilmsTopRated: build.query<IFetchedFilmsResponse, void>({
      query: () => filmsTopRatedRelativeUrl,
    }),
  }),
});

export const { useGetFilmsPopularQuery, useGetFilmsTopRatedQuery } = filmsApi;
