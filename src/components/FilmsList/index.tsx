import React, { useEffect, useState } from "react";
import getFilmYear from "../../utils/getFilmYear";
import useFilmsData from "../../hooks/useFilmsData";
import { IFilm } from "../../API/films/types";
import { IUser } from "../../API/user/types";
import useFilters from "../../hooks/useFilters";
import useFavoriteFilms from "../../hooks/useFavoriteFilms";
import fetchAllFavoriteFilms from "../../API/fetchFavoriteFilms";
import useActions from "../../hooks/useActions";
import FilmCard from "../FilmCard";

export default function FilmsList({ user }: { user: IUser }) {
  const favoriteFilms = useFavoriteFilms();
  const [favButtonClicketTimes, setFavButtonClicketTimes] = useState<number>(0);
  const { setFavoriteFilms, addFavoriteFilm, removeFavoriteFilm, setError } =
    useActions();

  useEffect(() => {
    fetchAllFavoriteFilms(user).then((result) => {
      if (result.favoriteFilms) setFavoriteFilms(result.favoriteFilms);
      if (result.error) setError({ error: result.error });
    });
  }, [favButtonClicketTimes]);
  const { films } = useFilmsData();
  const filters = useFilters();

  const filteredFilmsList = films.filter((film: IFilm) => {
    let isGenresSuitable = !filters.checkedGenres.length;
    let isYearsSuitable = false;
    if (!isGenresSuitable) {
      isGenresSuitable = true;
      for (const checkedGenre of filters.checkedGenres) {
        if (!film.genre_ids.includes(checkedGenre.id)) {
          isGenresSuitable = false;
          break;
        }
      }
    }
    isYearsSuitable =
      getFilmYear(film) >= filters.years[0] &&
      getFilmYear(film) <= filters.years[1];
    return isGenresSuitable && isYearsSuitable;
  });
  return (
    <>
      <ul style={{ display: "flex", flexWrap: "wrap" }}>
        {filteredFilmsList.length === 0 ? (
          <p>
            Установленным фильтрам не соответсвествует ни один фильм на этой
            странице
          </p>
        ) : (
          filteredFilmsList.map((film: IFilm) => {
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
                <FilmCard
                  film={film}
                  isFavorite={favoriteFilms.some(
                    (favFilm) => favFilm.id === film.id
                  )}
                  onFavButtonClick={(isFavorite: boolean) => {
                    setFavButtonClicketTimes(() => favButtonClicketTimes + 1);
                    if (isFavorite) {
                      removeFavoriteFilm(film);
                    } else {
                      addFavoriteFilm(film);
                    }
                  }}
                />
              </li>
            );
          })
        )}
      </ul>
    </>
  );
}
