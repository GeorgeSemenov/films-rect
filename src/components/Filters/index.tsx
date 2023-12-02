import React from "react";
import "./styles.scss";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import {
  filtersInitialValues,
  useFilters,
  useFiltersDispatch,
  filtersReducerTypes,
} from "../../context/filtersContext";
import SelectComponent from "../SelectComponent";
import Filters__genres from "../Filters__genres";
import Filters__years from "../Filters__years";
import { SelectChangeEvent } from "@mui/material/Select";
import Filters__pagination from "../Filters__pagination";
import SearchBar from "../SearchBar";

export default function Filters({
  className = "",
  wrapperClassName,
}: {
  className?: string;
  wrapperClassName?: string;
}) {
  const filters = useFilters() ?? filtersInitialValues;
  const filtersDispatch =
    useFiltersDispatch() ??
    (() => {
      console.error("error in component Filters, its out of filterscontext");
    });
  return (
    <aside className={wrapperClassName}>
      <form className={"filters " + className}>
        <div className="filters__title-container">
          <p>Фильтры</p>
          <IconButton>
            <CloseIcon />
          </IconButton>
        </div>
        <SearchBar
          className="filters__search-bar"
          onSearch={(searchQuery) => {
            filtersDispatch({
              type: filtersReducerTypes.changePaginationPage,
              paginationPage: 1,
            });
            filtersDispatch({
              type: filtersReducerTypes.setSearchQuery,
              searchQuery: searchQuery,
            });
          }}
        />
        <SelectComponent
          label="Сортировать по"
          selectOptions={filtersInitialValues.filtersSortingTypes}
          className="filters__select"
          handleChange={(e: SelectChangeEvent) => {
            filtersDispatch({
              type: filtersReducerTypes.changeSorting,
              checkedSortingType: e.target.value,
            });
            filtersDispatch({
              type: filtersReducerTypes.changePaginationPage,
              paginationPage: 1,
            });
          }}
          value={filters.checkedSortingType}
        />
        <Filters__years className="filters__years" />
        <Filters__genres className="filters__select" />
        <Filters__pagination />
      </form>
    </aside>
  );
}
