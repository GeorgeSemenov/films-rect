import { useSelector } from "react-redux";
import { IDisplayedError } from "../slices/errorSlice";

export default function useDisplayedError() {
  return useSelector((state: IDisplayedError) => state);
}
