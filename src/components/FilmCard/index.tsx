import React, { useState } from "react";
import "./styles.scss";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { cookiesNames, filmLinkPrefix, imgServerPrefix } from "../../constants";
import {
  Box,
  Button,
  CardActionArea,
  CardActions,
  IconButton,
} from "@mui/material";
import { StarBorder, Star } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import useActions from "../../hooks/useActions";
import { IFilm } from "../../API/films/types";

export default function FilmCard({
  film,
  onFavButtonClick,
}: {
  film: IFilm;
  onFavButtonClick: (isFav: boolean) => void;
}) {
  const { href, backdrop_path, title, id, vote_average } = film;
  const fullImageRef = imgServerPrefix + backdrop_path;
  return (
    <Card sx={{ maxWidth: 345, height: "100%" }}>
      <Link to={`${filmLinkPrefix}/${id}`}>
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
      </CardContent>
      <CardActions>
        <Button size="small" color="primary">
          Share
        </Button>
      </CardActions>
    </Card>
  );
}
