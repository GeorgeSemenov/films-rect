import React from "react";
import { IDocFilm } from "../../API/films/types";
import FilmCard from "../FilmCard";

export default function FilmsList({ films }: { films: IDocFilm[] }) {
  return (
    <>
      <ul style={{ display: "flex", flexWrap: "wrap", paddingLeft: "0" }}>
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
