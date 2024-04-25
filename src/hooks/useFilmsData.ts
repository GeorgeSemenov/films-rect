import { useSelector } from "react-redux";
import { storeType } from "../app/store";

export default function useFilmsData() {
  return useSelector((store: storeType) => store.filmsData);
}
