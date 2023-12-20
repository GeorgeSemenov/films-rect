import { configureStore } from "@reduxjs/toolkit";
import displayedErrorReducer from "../slices/errorSlice";

const store = configureStore({ reducer: displayedErrorReducer });

export default store;
