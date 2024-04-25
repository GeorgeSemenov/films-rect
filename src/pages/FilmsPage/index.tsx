import { ArrowBack } from "@mui/icons-material";
import "./styles.scss";
import { CircularProgress, IconButton } from "@mui/material";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { imgPostersServerPrefix } from "../../constants";
import { useGetFilmQuery } from "../../API/films";

export default function filmPage() {
  const { filmID } = useParams();
  const navigate = useNavigate();
  if (!filmID) {
    return <p>невозможно получить идентификатор фильма</p>;
  }
  const {
    data: filmData,
    isLoading: isFilmDataLoading,
    isError: isFetchingFilmDataError,
  } = useGetFilmQuery(+filmID);

  if (isFilmDataLoading) {
    return <CircularProgress />;
  }
  if (isFetchingFilmDataError || !filmData) {
    return <p>Не удалось подгрузить данные о фильме</p>;
  }
  const goBack = () => navigate(-1);
  const budget = filmData.details.budget;
  const genres = filmData.details.genres;
  const popularity = filmData.details.popularity;
  const title = filmData.details.title;
  const src = filmData.details?.poster_path
    ? imgPostersServerPrefix + filmData.details.poster_path
    : "#!";
  const maxActorsPerPage = 5;
  const cast =
    filmData.credits.cast.length > maxActorsPerPage
      ? filmData.credits.cast.slice(0, 5).concat([{ name: "..." }])
      : filmData.credits.cast;
  return (
    <>
      <div className="film-page">
        <img className="film-page__poster" alt="film's poster" src={src} />
        <div className="film-page__text-content">
          <h2>{title}</h2>
          <IconButton onClick={() => goBack()}>
            <ArrowBack />
          </IconButton>
          <div className="film-page__credits">
            <h3>В фильме снимались:</h3>
            <ul>
              {cast.map((actor) => (
                <li key={actor.name}>{actor.name}</li>
              ))}
            </ul>
          </div>
          <div className="film-page__details">
            <h3>детали</h3>
            <ul>
              <table>
                <tr>
                  <td>Бюджет</td>
                  <td>{budget + " денег"}</td>
                </tr>
                <tr>
                  <td>Жанры</td>
                  <td>
                    {genres.map((genre, index) => (
                      <span
                        className="film-page__details-genre"
                        key={genre.name}
                      >
                        {genre.name + (index === genres.length - 1 ? "" : ",")}
                      </span>
                    ))}
                  </td>
                </tr>
                <tr>
                  <td>Рэйтинг</td>
                  <td>{popularity}</td>
                </tr>
              </table>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
