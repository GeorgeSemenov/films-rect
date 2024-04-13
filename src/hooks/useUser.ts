import { useSelector } from "react-redux";
import { storeType } from "../app/store";

export default function useUser() {
  return useSelector((store: storeType) => store.user);
}
