import { useSelector } from "react-redux";
import { storeType } from "../app/store";

export default function useFilms() {
  useSelector((store: storeType) => store.films);
}
