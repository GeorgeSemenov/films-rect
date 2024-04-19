import { ArrowBack } from "@mui/icons-material";
import "./styles.scss";
import { CircularProgress, IconButton } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import fetchFilmData from "../../API/fetchFilmData";
import { filmDataInitialvalue, imgPostersServerPrefix } from "../../constants";

export default function filmPage() {
  const { filmID } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [filmData, setFilmData] = useState(filmDataInitialvalue);
  useEffect(() => {
    setIsFetchFailed(false);
    if (filmID) {
      fetchFilmData(+filmID).then(
        (result) => {
          setFilmData({
            credits: result.credits,
            details: result.details,
          });
          setIsLoading(false);
        },
        (err) => {
          console.error(err), setIsFetchFailed(true);
        }
      );
    }
  }, [filmID]);
  const [isFetchFailed, setIsFetchFailed] = useState(false);
  const navigate = useNavigate();
  const goBack = () => navigate(-1);
  const budget = filmData.details.budget;
  const genres = filmData.details.genres;
  const popularity = filmData.details.popularity;

  const maxActorsPerPage = 5;
  const cast =
    filmData.credits.cast.length > maxActorsPerPage
      ? filmData.credits.cast.slice(0, 5).concat([{ name: "..." }])
      : filmData.credits.cast;
  return isFetchFailed ? (
    <p>Не удалось подгрузить данные о фильме.</p>
  ) : (
    <>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <div className="film-page">
          <img
            className="film-page__poster"
            alt="film's poster"
            src={
              filmData.details?.poster_path.length > 0
                ? imgPostersServerPrefix + filmData.details.poster_path
                : "#!"
            }
          />
          <div className="film-page__text-content">
            <h2>{filmData.details.title}</h2>
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
                          {genre.name +
                            (index === genres.length - 1 ? "" : ",")}
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
      )}
    </>
  );
}
