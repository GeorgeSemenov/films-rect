import React from "react";
import useFilmsData from "../../hooks/useFilmsData";
import { IDocFilm } from "../../API/films/types";
import useFilters from "../../hooks/useFilters";
import useActions from "../../hooks/useActions";
import FilmCard from "../FilmCard";
import { CircularProgress } from "@mui/material";

export default function FilmsList({ films }: { films: IDocFilm[] }) {
  // const { setFavoriteFilms, setError } = useActions();
  // const { films } = useFilmsData();

  return (
    <>
      <ul style={{ display: "flex", flexWrap: "wrap" }}>
        {films.length === 0 ? (
          <p>
            Установленным фильтрам не соответсвествует ни один фильм на этой
            странице
          </p>
        ) : (
          films.map((film: IDocFilm) => {
            return (
              <li
                key={film.id}
                style={{
                  flexShrink: "0",
                  width: "296px",
                  marginBottom: "15px",
                  marginRight: "15px",
                }}
              >
                <FilmCard film={film} />
              </li>
            );
          })
        )}
      </ul>
    </>
  );
}
