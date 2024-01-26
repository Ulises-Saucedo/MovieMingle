<script setup>
import { useRoute } from "vue-router";
import MovieProvider from "../providers/movies.js";

const route = useRoute();
const movieRef = new MovieProvider();
const movie = movieRef.movie;

await movieRef.filterMovieById(route.params.id);
</script>

<template>
  <main class="w-full h-screen justify-center items-center">
    <div
      class="flex flex-col md:flex-row max-h-[700px] max-w-[800px] p-4 mx-auto"
    >
      <section class="w-full md:w-1/2 h-full">
        <img
          :src="`https://image.tmdb.org/t/p/original/${movie.poster_path}`"
          :alt="movie.title"
          class="w-full h-full object-contain rounded"
        />
      </section>
      <section class="flex flex-col ml-2 justify-between w-full md:w-1/2">
        <section>
          <div class="font-bold text-xl text-[#fff]">
            {{ movie.title }}
          </div>
          <div class="mt-2 flex gap-2 text-[#fff]">
            <div
              v-for="genre in movie.genres"
              class="inline p-1 rounded-sm bg-red-500"
            >
              {{ genre.name }}
            </div>
          </div>
        </section>
        <section>
          <div class="text-[#fff]">
            {{ movie.release_date }}
          </div>
          <div class="row text-[#fff]">
            {{ movie.overview }}
          </div>
          <div class="w-full p-1 rounded bg-red-500 text-[#fff]">
            <router-link to="/">Back</router-link>
          </div>
        </section>
      </section>
    </div>
  </main>
</template>
