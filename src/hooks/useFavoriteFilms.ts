import { useSelector } from "react-redux";
import { storeType } from "../app/store";

export default function useFavoriteFilms() {
  return useSelector((store: storeType) => store.favoriteFilms);
}
