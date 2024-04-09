import { TOKEN, urlBase } from "../constants";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "themovieDBApi",
  baseQuery: fetchBaseQuery({
    baseUrl: urlBase,
    prepareHeaders: (headers) => {
      headers.set("accept", "application/json");
      headers.set("content-type", "application/json");
      headers.set("Authorization", `Bearer ${TOKEN}`);
      return headers;
    },
  }),
  tagTypes: ["genres"],
  endpoints: () => ({}),
});
