import { useGetGenresQuery } from "../../API/genres";
import useActions from "../../hooks/useActions";

export default function initiateFilters() {
  const { setTotalPaginationPages, setError, setGenres } = useActions();
  const {
    isLoading,
    error: fetchGenresError,
    data: uploadedGenres,
  } = useGetGenresQuery();

  if (!isLoading) {
    if (fetchGenresError) {
      setError({
        error: new Error("Ошибка при загрузке списка жанров"),
      });
    } else {
      if (uploadedGenres) setGenres(uploadedGenres);
    }
  }
}
