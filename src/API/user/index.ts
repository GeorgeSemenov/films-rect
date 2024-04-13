import { accountIdRelativeUrl } from "../../constants";
import { api } from "../api";

const userApi = api.injectEndpoints({
  endpoints: (build) => ({
    getUserid: build.query<number, void>({
      query: () => accountIdRelativeUrl,
    }),
  }),
});

export const { useGetUseridQuery } = userApi;
