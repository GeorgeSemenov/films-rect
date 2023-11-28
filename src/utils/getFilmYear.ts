export default function getFilmYear(film: IReleaseDateIncludable) {
  //Данная функция обрабатывают строку данного типа: release_date: "1972-03-14";
  const answer: number = +film.release_date.substring(0, 4);
  return answer;
}

interface IReleaseDateIncludable {
  release_date: string;
}
