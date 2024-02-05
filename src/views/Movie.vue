<script setup>
import { useRoute } from "vue-router";
import { getMovie } from "../helpers/moviesHelpers";

const route = useRoute();
const movie = await getMovie(route.params.id);
</script>

<template>
  <div
    class="w-full h-[500px] relative bg-cover bg-top z-10"
    :style="{
      'background-image': `url(
        'https://image.tmdb.org/t/p/original${movie.backdrop_path}'
      )`,
    }"
  >
    <div
      class="bg-gradient-to-b from-transparent to-[#242335] w-full h-full absolute top-0 left-0 z-20"
    ></div>
    <div
      class="absolute z-30 -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
    >
      <h1 class="text-5xl font-semibold text-[#fff]">{{ movie.title }}</h1>
    </div>
  </div>
  <div
    class="flex flex-col gap-4 items-center max-h-[700px] max-w-[800px] p-4 mx-auto"
  >
    <div class="mt-2 flex gap-2 text-[#fff]">
      <div
        v-for="genre in movie.genres"
        class="inline px-4 py-1 bg-red-500 rounded-2xl"
      >
        {{ genre.name }}
      </div>
    </div>
    <div class="text-[#fff]">
      {{ movie.release_date }}
    </div>
    <div class="row text-[#fff]">
      {{ movie.overview }}
    </div>
    <router-link
      to="/"
      class="w-full h-full rounded-md py-1 bg-red-500 text-center text-[#fff]"
      >Back</router-link
    >
  </div>
</template>
