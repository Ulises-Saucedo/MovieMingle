const API_KEY = import.meta.env.VITE_API_KEY;

export const getUrl = (route) => {
  if (route == "/movies") {
    return `https://api.themoviedb.org/3/movie/popular?`;
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
