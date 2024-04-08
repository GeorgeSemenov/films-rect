import { useSelector } from "react-redux";
import { storeType } from "../app/store";

export default function useFilters() {
  return useSelector((state: storeType) => state.filters);
}
