import { useSelector } from "react-redux";
import { IDisplayedError } from "../slices/error/types";

export default function useDisplayedError() {
  return useSelector((state: IDisplayedError) => state);
}
