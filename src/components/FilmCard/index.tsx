import React from "react";
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

export default function FilmCard({
  film,
  updateFilms,
}: {
  film: IFilm;
  updateFilms: (func: (films: IFilm[]) => IFilm[]) => void;
}) {
  const [cookie] = useCookies([cookiesNames.accountId]);
  const { isFavorite, href, backdrop_path, title, id, vote_average } = film;
  const fullImageRef = imgServerPrefix + backdrop_path;
  return (
    <Card sx={{ maxWidth: 345 }}>
      <Link to={href}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="140"
            image={fullImageRef}
            alt={title}
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
            postFavoriteFilm(
              cookie[cookiesNames.accountId],
              id,
              !isFavorite
            ).then(() => {
              updateFilms((films) => {
                const film = films.find((flm: IFilm) => flm["id"] === id);
                if (film) {
                  film.isFavorite = !isFavorite;
                }
                return films;
              });
            });
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
