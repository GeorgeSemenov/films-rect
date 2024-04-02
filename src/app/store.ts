import { configureStore } from "@reduxjs/toolkit";
import displayedErrorReducer from "../slices/error";

const store = configureStore({ reducer: displayedErrorReducer });

export default store;
