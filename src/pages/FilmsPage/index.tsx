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
  const {
    data: filmData,
    isLoading: isFilmDataLoading,
    isError: isFetchingFilmDataError,
  } = useGetFilmQuery(filmID ? +filmID : 0);
  if (!filmID) {
    return <p>невозможно получить идентификатор фильма</p>;
  }

  if (isFilmDataLoading) {
    return <CircularProgress />;
  }
  if (isFetchingFilmDataError || !filmData) {
    return <p>Не удалось подгрузить данные о фильме</p>;
  }
  const goBack = () => navigate(-1);
  const name = filmData.name;
  const src = filmData.poster.url;
  const maxActorsPerPage = 5;
  const cast =
    filmData.persons.length > maxActorsPerPage
      ? filmData.persons.slice(0, 5).concat([{ name: "...", id: 0 }])
      : filmData.persons;
  return (
    <>
      <div className="film-page">
        <img className="film-page__poster" alt="film's poster" src={src} />
        <div className="film-page__text-content">
          <h2>{name}</h2>
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
