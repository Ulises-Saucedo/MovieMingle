import { defineStore } from "pinia";

const API_KEY = import.meta.env.VITE_API_KEY;

export const useMovies = defineStore("movies", {
  state: () => ({
    movies: [],
    total_pages: 0,
    current_page: 1,
  }),
  actions: {
    async getTrendingMovies(page) {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/popular?page=${page}&api_key=${API_KEY}`
        );
        const { results } = await response.json();
        this.movies = results;
      } catch (e) {
        console.log(e);
      }
    },
    async loadMoreData(url) {
      this.current_page += 1;
      if (this.current_page <= 500) {
        try {
          const response = await fetch(
            `${url}page=${this.current_page}&api_key=${API_KEY}`
          );
          const { results } = await response.json();
          this.movies.push(...results);
        } catch (e) {
          console.log(e);
        }
      }
    },
    async getMoviesByQuery(q) {
      this.current_page = 1;
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/search/movie?query=${q}&api_key=${API_KEY}`
        );
        const { results } = await response.json();
        this.movies = results;
      } catch (e) {
        console.log(e);
      }
    },
    async getMoviesByGenre(genre) {
      this.current_page = 1;
      try {
        const response = await fetch(
          `
          https://api.themoviedb.org/3/discover/movie?with_genres=${genre}&api_key=${API_KEY}`
        );
        const { results } = await response.json();
        this.movies = results;
      } catch (e) {
        console.log(e);
      }
    },
  },
});
