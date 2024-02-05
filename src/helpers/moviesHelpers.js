import { useMovies } from "../store/moviesStore";

const API_KEY = import.meta.env.VITE_API_KEY;
const store = useMovies();

export const getUrl = (route) => {
  if (route == "/movies") {
    return `https://api.themoviedb.org/3/movie/popular?`;
  } else {
    if (route.category) {
      return `https://api.themoviedb.org/3/movie/popular?with_genres=${route.category}&`;
    } else if (route.q) {
      return `https://api.themoviedb.org/3/search/movie?query=${route.q}&`;
    }
  }
};

export const getGenres = async () => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`
    );
    const { genres } = await response.json();
    return genres;
  } catch (e) {
    console.log(e);
  }
};

export const verifyQueries = async (route) => {
  if (route.query.category) {
    await store.getMoviesByGenre(route.query.category);
  } else if (route.query.q) {
    await store.getMoviesByQuery(route.query.q);
  }
};
