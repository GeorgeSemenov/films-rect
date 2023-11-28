import fetchData from "./fetchData";
import { URLs } from "../constants";
import { filtersInitialValues } from "../context/filtersContext";
export default async function fetchGenres() {
  let result;
  let genres;
  try {
    result = await fetchData({ url: URLs.genres });
    genres = result.genres;
  } catch (err) {
    console.error("error in fetchGenres", err);
    genres = filtersInitialValues.genres;
  }

  return genres;
}
