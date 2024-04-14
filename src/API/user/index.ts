import { accountIdRelativeUrl } from "../../constants";
import { api } from "../api";
import { IUser } from "./types";

const userApi = api.injectEndpoints({
  endpoints: (build) => ({
    getUserid: build.query<IUser, void>({
      query: () => accountIdRelativeUrl,
    }),
  }),
});

export const { useGetUseridQuery } = userApi;
