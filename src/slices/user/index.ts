import { createSlice } from "@reduxjs/toolkit";
import { IUser } from "../../API/user/types";
import { initialUserState as initialState } from "./values";

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state: IUser, { payload: fetchedUser }: { payload: IUser }) => ({
      ...fetchedUser,
    }),
  },
});

export const { actions, reducer } = userSlice;
