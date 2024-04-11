import React from "react";
import Filters from "../Filters";
import FilmsList from "../FilmsList";
import { useGetGenresQuery } from "../../API/genres";
import useActions from "../../hooks/useActions";
import { useFilters } from "../../context/filtersContext";

export default function FilmsListAndFilters() {
  const {
    isLoading: isLoadingGenres,
    data: fetchedGenres,
    error: errorFetchedGenres,
  } = useGetGenresQuery();
  const { setGenres, setError, setTotalPaginationPages } = useActions();

  if (!isLoadingGenres) {
    if (errorFetchedGenres) {
      setError({ error: new Error("Невозможно подгрузить данные ") });
    } else {
      initiateFiltersByFetchedData();
    }
  }

  const filters = useFilters();
  // const {} = useGet
  function initiateFiltersByFetchedData() {
    if (fetchedGenres) setGenres(fetchedGenres);
    //TODO нужно ещё добавить полное колличество страниц
  }
  return (
    <div style={{ display: "flex" }}>
      <Filters initiateFiltersByFetchedData={initiateFiltersByFetchedData} />
      <FilmsList />
    </div>
  );
}
