import { useSelector } from "react-redux";
import { storeType } from "../app/store";

export default function useFilms() {
  return useSelector((store: storeType) => store.films);
}
