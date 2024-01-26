<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import Header from "../components/Header.vue";
import MovieProvider from "../providers/movies";
import { getByCategory } from "../helpers/moviesHelpers.js";

const movieRef = new MovieProvider();
const route = useRoute();
const router = useRouter();
const movies = ref([]);

const onSearched = async (val) => {
  router.push({ path: route.path, query: { q: val } });
  if (val == "") movies.value = await movieRef.getMovies();
  else if (val != "") movies.value = await movieRef.filterMoviesByName(val);
};

onMounted(async () => {
  if (route.query.q) movies.value = await onSearched(route.query.q);
  else if (route.query.category)
    movies.value = await getByCategory(route.query.category);
});
</script>

<template>
  <Header @onSearched="onSearched"></Header>
  <section
    class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 p-4 gap-4 max-w-[1000px] mx-auto"
    ref="container"
  >
    <div v-for="movie in movies.results" class="rounded overflow-hidden">
      <router-link :to="{ name: 'movie', params: { id: movie.id } }">
        <img
          :src="`https://image.tmdb.org/t/p/original/${movie.poster_path}`"
          :alt="movie.title"
          class="h-full"
        />
      </router-link>
    </div>
  </section>
</template>
