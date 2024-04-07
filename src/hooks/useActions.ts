import { useDispatch } from "react-redux";
import { actions as displayedErrorActions } from "../slices/error";
import { actions as filtersActions } from "../slices/filters";
import { useMemo } from "react";
import { bindActionCreators } from "@reduxjs/toolkit";

export default function useActions() {
  const dispatch = useDispatch();

  const rootActions = {
    ...displayedErrorActions,
    ...filtersActions,
  };

  return useMemo(() => bindActionCreators(rootActions, dispatch), [dispatch]);
}
