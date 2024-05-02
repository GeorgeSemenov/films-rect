import React from "react";
import "./styles.scss";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import Filters__genres from "../Filters__genres";
import Filters__years from "../Filters__years";
import Filters__pagination from "../Filters__pagination";
import SearchBar from "../SearchBar";
import useActions from "../../hooks/useActions";
import useFilters from "../../hooks/useFilters";
import useFilms from "../../hooks/useFilmsData";

export default function Filters({
  className = "",
  wrapperClassName,
}: {
  className?: string;
  wrapperClassName?: string;
}) {
  const firstPaginationPage = 1;
  const { resetFilters, setSearchQuery, setPaginationPage } = useActions();
  const filters = useFilters();
  const { totalPages } = useFilms();
  function onReset() {
    resetFilters();
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
            setSearchQuery(searchQuery ? searchQuery : "");
            setPaginationPage(firstPaginationPage);
          }}
        />
        <Filters__years className="filters__years" />
        <Filters__genres className="filters__select" />
        <Filters__pagination
          paginationPage={filters.paginationPage}
          paginationTotalPages={totalPages}
        />
      </form>
    </aside>
  );
}
