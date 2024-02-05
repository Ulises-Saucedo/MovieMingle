<script setup>
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import TrendingSection from "./TrendingSection.vue";
import { getUrl, getGenres } from "../helpers/moviesHelpers";
import { useMovies } from "../store/moviesStore";

const router = useRouter();
const route = useRoute();
const searched = ref("");
const scrollComponent = ref(null);
const store = useMovies();
const genres = await getGenres();

const handleScroll = async () => {
  let element = scrollComponent.value;
  const threshold = window.innerHeight + 100;
  if (element.getBoundingClientRect().bottom <= threshold) {
    await store.loadMoreData(getUrl(route.path));
  }
};

const handleInput = () => {
  router.push({ name: "moviescategory", query: { q: searched.value } });
};

window.addEventListener("scroll", handleScroll);
await store.getTrendingMovies(1);
</script>

<template>
  <div
    class="w-full h-[500px] relative bg-cover bg-top z-10"
    :style="{
      'background-image': `url(
        'https://image.tmdb.org/t/p/original${store.movies[0].backdrop_path}'
      )`,
    }"
  >
    <div
      class="bg-gradient-to-b from-transparent to-[#242335] w-full h-full absolute top-0 left-0 z-20"
    ></div>
    <div class="flex justify-end w-full p-5">
      <input
        type="text"
        class="py-1 px-3 z-30 rounded-2xl font-normal bg-[#242335] text-[#fff] border-[1px] border-solid border-slate-600 focus:outline-1 focus:outline-double focus:outline-slate-500 placeholder:italic placeholder:text-slate-600"
        placeholder="Search..."
        v-model="searched"
        @keyup.enter="handleInput"
      />
    </div>
  </div>
  <div ref="scrollComponent">
    <TrendingSection :trending="store.movies" :genres="genres" />
  </div>
</template>

<style scoped></style>
