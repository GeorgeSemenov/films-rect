import { useDispatch } from "react-redux";
import { actions as displayedErrorActions } from "../slices/errorSlice";
import { useMemo } from "react";
import { bindActionCreators } from "@reduxjs/toolkit";

export default function useActions() {
  const dispatch = useDispatch();

  const rootActions = {
    ...displayedErrorActions,
  };

  return useMemo(() => bindActionCreators(rootActions, dispatch), [dispatch]);
}
