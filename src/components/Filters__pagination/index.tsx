import { Pagination } from "@mui/material";
import React from "react";
import useFilters from "../../hooks/useFilters";
import useActions from "../../hooks/useActions";

export default function Filters__pagination({
  className,
  paginationPage,
  paginationTotalPages,
}: {
  className?: string;
  paginationPage;
  paginationTotalPages;
}) {
  const { setPaginationPage } = useActions();
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPaginationPage(value);
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
