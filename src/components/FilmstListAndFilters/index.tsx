import React from "react";
import Filters from "../Filters";
import FilmsList from "../FilmsList";
import { useGetFilmsPopularQuery } from "../../API/films";

export default function FilmsListAndFilters() {
  return (
    <div style={{ display: "flex" }}>
      <Filters />
      <FilmsList />
    </div>
  );
}
