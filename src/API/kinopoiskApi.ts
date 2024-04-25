import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query";
import { KINOPOISK_TOKEN, URL_BASE } from "../constants";

export const kinopoiskApi = createApi({
  reducerPath: "kinopoiskApi",
  baseQuery: fetchBaseQuery({
    baseUrl: URL_BASE,
    prepareHeaders: (headers) => {
      headers.set(`accept`, `application/json`);
      headers.set(`X-API-KEY:`, KINOPOISK_TOKEN);
      return headers;
    },
  }),
  tagTypes: ["genres", "films"],
  endpoints: (build) => ({
    getKinopoiskFilms: build.query<void, { page: number; limit: number }>({
      providesTags: ["films"],
      query: ({ page, limit }) => {
        return `movie?page=${page}&limit=${limit}`;
      },
    }),
  }),
});

// export const {  } = kinopoiskApi;

// export const pokemonApi = createApi({
//   reducerPath: 'pokemonApi',
//   baseQuery: fetchBaseQuery({ baseUrl: 'https://pokeapi.co/api/v2/' }),
//   endpoints: (builder) => ({
//     getPokemonByName: builder.query<void, string>({
//       query: (name) => `pokemon/${name}`,
//     }),
//   }),
// })

// // Export hooks for usage in function components, which are
// // auto-generated based on the defined endpoints
// export const { useGetPokemonByNameQuery } = pokemonApi
