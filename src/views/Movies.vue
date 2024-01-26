<script setup>
import { useRouter } from "vue-router";
import Header from "../components/Header.vue";
import MovieProvider from "../providers/movies";
import { getMoviesGenres, getMoviesByGenres } from "../helpers/moviesHelpers";

const movieRef = new MovieProvider();
const genres = await getMoviesGenres();
const moviesByGenres = await getMoviesByGenres();
const router = useRouter();

const searchMovies = (q) => {
  movieRef.query.value = q;
  router.replace({ name: "moviescategory" });
};
</script>

<template>
  <Header @onSearch="searchMovies" />
  <section
    v-for="(genre, i) in genres.genres"
    class="p-4 bg-[#131315] mx-4 mt-20 rounded"
  >
    <p class="font-bold text-[#fff] flex w-full justify-between">
      {{ genre.name }}
      <router-link
        class="bg-transparent border-none"
        :to="{ name: 'moviescategory', query: { category: genre.id } }"
      >
        <v-icon name="bi-plus-circle" scale="1.2" />
      </router-link>
    </p>
    <div class="flex overflow-x-auto gap-4 h-[300px] items-center scrollbar">
      <div
        v-for="movie in moviesByGenres[i].results"
        class="h-[200px] min-w-[150px] rounded overflow-hidden"
      >
        <router-link :to="{ name: 'movie', params: { id: movie.id } }">
          <img
            :src="`https://image.tmdb.org/t/p/original/${movie.poster_path}`"
            :alt="movie.title"
            class="h-full w-full object-cover"
          />
        </router-link>
      </div>
    </div>
  </section>
</template>

<style>
.scrollbar {
  --sb-track-color: #09090b;
  --sb-thumb-color: #131315;
  --sb-size: 11px;
  scrollbar-color: var(--sb-thumb-color) var(--sb-track-color);
}
.scrollbar::-webkit-scrollbar {
  width: var(--sb-size);
}
.scrollbar::-webkit-scrollbar-track {
  background: var(--sb-track-color);
  border-radius: 11px;
}
.scrollbar::-webkit-scrollbar-thumb {
  background: var(--sb-thumb-color);
  border-radius: 11px;
  border: 1px solid #3e3e3e;
}
</style>
