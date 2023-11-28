import fetchData from "./fetchData";
import { urlBase, filmDataInitialvalue } from "../constants";
import { Url } from "url";

export default async function fetchFilmData(filmID: number) {
  const creditsURL = urlBase + "/3/movie/" + filmID + "/credits?language=ru-RU";
  const detailsURL = urlBase + "/3/movie/" + filmID + "?language=ru-RU";

  const credits = await fetchPartFilmData(
    filmID,
    creditsURL,
    filmDataInitialvalue.credits
  );
  const details = await fetchPartFilmData(
    filmID,
    detailsURL,
    filmDataInitialvalue.details
  );
  return { credits, details };
}

async function fetchPartFilmData(
  filmID: number,
  url: string | URL,
  valueOnFailureFetch: ICredits | IDetails
) {
  let result;
  try {
    result = await fetchData({ url: url });
  } catch (err) {
    console.error(err);
    result = valueOnFailureFetch;
    throw err
  }
  return result;
}

interface IDetails {
  title: string;
  budget: number;
  genres: IGenre[];
  popularity: number;
  poster_path?: string | Url;
}
interface ICredits {
  cast: ICast[];
}
interface ICast {
  name: string;
}
interface IGenre {
  name: string;
}
