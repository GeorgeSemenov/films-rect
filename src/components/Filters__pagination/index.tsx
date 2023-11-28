import { Pagination } from "@mui/material";
import React, { useState } from "react";
import {
  filtersReducerTypes,
  useFilters,
  useFiltersDispatch,
} from "../../context/filtersContext";

export default function Filters__pagination({ className }: IProps) {
  const { paginationPage, paginationTotalPages } = useFilters() ?? {
    paginationTotalPages: 5,
    paginationPage: 1,
  };
  const filtersDispatch = useFiltersDispatch();
  const [page, setPage] = useState(1);
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    if (filtersDispatch)
      filtersDispatch({
        type: filtersReducerTypes.changePaginationPage,
        paginationPage: value,
      });
  };
  return (
    <Pagination
      style={{ justifyContent: "center" }}
      color="primary"
      className={className ?? ""}
      size="small"
      count={paginationTotalPages}
      page={paginationPage}
      onChange={handleChange}
    />
  );
}

interface IProps {
  className?: string;
}
