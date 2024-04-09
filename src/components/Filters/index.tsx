import React, { useEffect } from "react";
import "./styles.scss";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import SelectComponent from "../SelectComponent";
import Filters__genres from "../Filters__genres";
import Filters__years from "../Filters__years";
import { SelectChangeEvent } from "@mui/material/Select";
import Filters__pagination from "../Filters__pagination";
import SearchBar from "../SearchBar";
import useActions from "../../hooks/useActions";
import { filtersInitialValues } from "../../slices/filters/values";
import { sortingValuesType } from "../../slices/filters/types";
import useFilters from "../../hooks/useFilters";
import { useGetGenresQuery } from "../../API/genres";

export default function Filters({
  className = "",
  wrapperClassName,
}: {
  className?: string;
  wrapperClassName?: string;
}) {
  const firstPaginationPage = 1;
  const {
    isLoading: isLoadingGenres,
    data: fethcedGenres,
    error: errorFetchedGenres,
  } = useGetGenresQuery();
  const {
    resetFilters,
    setPaginationPage,
    setSearchQuery,
    setSorting,
    setGenres,
    setError,
  } = useActions();

  function initiateFiltersByFetchedData() {
    if (fethcedGenres) setGenres(fethcedGenres);
    //TODO нужно ещё добавить полное колличество страниц
  }
  if (!isLoadingGenres) {
    if (errorFetchedGenres) {
      setError({ error: new Error("Невозможно подгрузить данные ") });
    } else {
      initiateFiltersByFetchedData();
    }
  }
  const filters = useFilters();
  function onReset() {
    resetFilters();
    initiateFiltersByFetchedData();
  }
  return (
    <aside className={wrapperClassName}>
      <form className={"filters " + className}>
        <div className="filters__title-container">
          <p>Фильтры</p>
          <IconButton onClick={onReset}>
            <CloseIcon />
          </IconButton>
        </div>
        <SearchBar
          className="filters__search-bar"
          onSearch={(searchQuery) => {
            if (!searchQuery) return;
            setSearchQuery(searchQuery);
            setPaginationPage(firstPaginationPage);
          }}
        />
        <SelectComponent
          label="Сортировать по"
          selectOptions={filtersInitialValues.filtersSortingTypes}
          className="filters__select"
          handleChange={(e: SelectChangeEvent) => {
            setSorting(e.target.value as sortingValuesType);
            setPaginationPage(firstPaginationPage);
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
