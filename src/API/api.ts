import { TOKEN, URL_BASE } from "../constants";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "kinopoiskApi",
  baseQuery: fetchBaseQuery({
    baseUrl: URL_BASE,
    prepareHeaders: (headers) => {
      headers.set(`accept`, `application/json`);
      headers.set(`X-API-KEY:`, TOKEN);
      return headers;
    },
  }),
  tagTypes: ["genres", "film", "films"],
  endpoints: () => ({}),
});
