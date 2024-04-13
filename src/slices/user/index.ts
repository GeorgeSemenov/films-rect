import { createSlice } from "@reduxjs/toolkit";
import { IUser } from "./types";

const initialState: IUser | null = null;

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state: IUser | null, { payload: user }: { payload: number }) => {
      return;
    },
  },
});

export const { actions, reducer } = userSlice;
