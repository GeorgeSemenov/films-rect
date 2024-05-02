import React from "react";
import "./styles.scss";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { filmLinkPrefix } from "../../constants";
import { Button, CardActionArea, CardActions } from "@mui/material";
import { Link } from "react-router-dom";
import { IDocFilm } from "../../API/films/types";

export default function FilmCard({ film }: { film: IDocFilm }) {
  const {
    poster: { previewUrl: previewPoster },
    name,
    id,
    rating: { kp: kpRating },
  } = film;
  return (
    <Card sx={{ maxWidth: 345, height: "100%" }}>
      <Link to={`${filmLinkPrefix}/${id}`}>
        <CardActionArea sx={{ textAlign: "center", display: "flex" }}>
          <CardMedia
            sx={{ width: "auto" }}
            component="img"
            height="140"
            image={previewPoster}
            alt={`Картинка фильма ${name} не подгрузилась, извините`}
          />
        </CardActionArea>
      </Link>
      <CardContent className="film-card__footer">
        <div>
          <Link to={`${filmLinkPrefix}/${id}`}>
            <Typography gutterBottom variant="h5" component="div">
              {name}
            </Typography>
          </Link>
          <Typography variant="body2" color="text.secondary">
            Рейтинг {kpRating}
          </Typography>
        </div>
      </CardContent>
      <CardActions>
        <Button size="small" color="primary">
          Share
        </Button>
      </CardActions>
    </Card>
  );
}
