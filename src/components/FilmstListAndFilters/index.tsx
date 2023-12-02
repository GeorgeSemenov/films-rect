import React from "react";
import Filters from "../Filters";
import FilmsList from "../FilmsList";

export default function FilmsListAndFilters() {
  return (
    <div style={{ display: "flex" }}>
      <Filters />
      <FilmsList />
    </div>
  );
}
