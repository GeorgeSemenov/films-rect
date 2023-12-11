import React, { useState } from "react";
import "./styles.scss";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { IFilm, cookiesNames, imgServerPrefix } from "../../constants";
import { Button, CardActionArea, CardActions, IconButton } from "@mui/material";
import { StarBorder, Star } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { postFavoriteFilm } from "../../API/postFavoriteFilmsList";
import { useCookies } from "react-cookie";
import { useDisplayedErrorDispatchContext } from "../../context/ErrorContext";

export default function FilmCard({
  film,
  updateFilms,
}: {
  film: IFilm;
  updateFilms: (func: (films: IFilm[]) => IFilm[]) => void;
}) {
  const dispatchError = useDisplayedErrorDispatchContext();
  const [cookie] = useCookies([cookiesNames.accountId]);
  const [isPending, setIsPending] = useState(false);
  const { isFavorite, href, backdrop_path, title, id, vote_average } = film;
  const fullImageRef = imgServerPrefix + backdrop_path;
  function updateFavorites(isThisFilmFavorite: boolean) {
    updateFilms((films) => {
      const film = films.find((flm: IFilm) => flm["id"] === id);
      if (film) {
        film.isFavorite = isThisFilmFavorite;
      }
      return films;
    });
  }
  return (
    <Card sx={{ maxWidth: 345 }}>
      <Link to={href}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="140"
            image={fullImageRef}
            alt={`Картинка фильма ${title} не подгрузилась, извините. Возможно проблема с VPN.`}
          />
        </CardActionArea>
      </Link>
      <CardContent className="film-card__footer">
        <div>
          <a href={href}>
            <Typography gutterBottom variant="h5" component="div">
              {title}
            </Typography>
          </a>
          <Typography variant="body2" color="text.secondary">
            Рейтинг {vote_average}
          </Typography>
        </div>
        <IconButton
          onClick={() => {
            updateFavorites(!isFavorite);

            let isFavoriteBeforeClick: boolean;
            if (!isPending) {
              setIsPending(true);
              isFavoriteBeforeClick = isFavorite;

              postFavoriteFilm(cookie[cookiesNames.accountId], id, !isFavorite)
                .catch((err) => {
                  if (dispatchError) {
                    dispatchError({
                      error: err,
                      displayDuration: "10s",
                    });
                  }
                  updateFavorites(isFavoriteBeforeClick);
                })
                .finally(() => setIsPending(false));
            }
          }}
        >
          {isFavorite ? <Star /> : <StarBorder />}
        </IconButton>
      </CardContent>
      <CardActions>
        <Button size="small" color="primary">
          Share
        </Button>
      </CardActions>
    </Card>
  );
}
